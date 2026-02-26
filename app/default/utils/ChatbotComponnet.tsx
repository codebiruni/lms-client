/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, X, Send, Minimize2, Check, Sparkles, GraduationCap, BookOpen } from 'lucide-react'
import Chatbot from '../functions/chatbot'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  id: string
}

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showChatButton, setShowChatButton] = useState(true)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  // Auto-scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use the Chatbot function directly
      const response = await Chatbot(input.trim())
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at brightpath@codebiruni.com',
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    setCopiedMessageId(null)
    setEditingMessageId(null)
  }

  const openChat = () => {
    setIsOpen(true)
    setShowChatButton(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setShowChatButton(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditContent(content)
  }

  const handleSaveEdit = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: editContent } : msg
    ))
    setEditingMessageId(null)
    setEditContent('')
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditContent('')
  }

  const formatMessage = (content: string) => {
    let formattedContent = content;

    // Convert markdown links [text](url) to clickable links
    formattedContent = formattedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="inline-link" style="color: #f59e0b; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">$1</a>'
    );

    // Convert * bullet points to proper • points
    formattedContent = formattedContent.replace(/^\*\s+/gm, '• ');

    // Convert markdown-style formatting to HTML
    formattedContent = formattedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #f59e0b;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');

    // Function to extract domain from URL
    const getDomainFromUrl = (url: string): string => {
      try {
        const domain = url.replace(/^https?:\/\//, '').split('/')[0];
        return domain.startsWith('www.') ? domain.substring(4) : domain;
      } catch {
        return url;
      }
    };

    // Function to format phone numbers
    const formatPhoneNumber = (phone: string): string => {
      const cleaned = phone.replace(/[^\d+]/g, '');
      if (cleaned.startsWith('+')) {
        return cleaned;
      } else if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      } else {
        return cleaned;
      }
    };

    // Detect and convert URLs
    formattedContent = formattedContent.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) => {
        const domain = getDomainFromUrl(url);
        return `<a href="${url}" class="inline-link url-link" style="color: #f59e0b; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${domain}</a>`;
      }
    );

    // Detect and convert email addresses
    formattedContent = formattedContent.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      (email) => {
        return `<a href="mailto:${email}" class="inline-link email-link" style="color: #f59e0b; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${email}</a>`;
      }
    );

    // Detect and convert phone numbers
    formattedContent = formattedContent.replace(
      /(\+?[\d\s\-\(\)]{10,})/g,
      (phone) => {
        const digitCount = phone.replace(/[^\d]/g, '').length;
        if (digitCount >= 10) {
          const formattedPhone = formatPhoneNumber(phone);
          return `<a href="tel:${phone.replace(/[^\d+]/g, '')}" class="inline-link phone-link" style="color: #f59e0b; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${formattedPhone}</a>`;
        }
        return phone;
      }
    );

    // Convert newlines to br tags
    formattedContent = formattedContent.replace(/\n/g, '<br/>');

    return (
      <div 
        className="message-content"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('inline-link')) {
            e.preventDefault();
            const href = target.getAttribute('href');
            
            if (href) {
              setTimeout(() => {
                if (target.classList.contains('url-link')) {
                  window.open(href, '_blank', 'noopener noreferrer');
                } else if (target.classList.contains('email-link')) {
                  window.location.href = href;
                } else if (target.classList.contains('phone-link')) {
                  if (/^tel:\+?[\d]+$/.test(href)) {
                    window.location.href = href;
                  }
                } else {
                  if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener noreferrer');
                  } else {
                    window.location.href = href;
                  }
                }
              }, 300);
            }
          }
        }}
        style={{ 
          cursor: 'default',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      />
    );
  };

  // Welcome message when first opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `✨ **Welcome to Bright Path Academy!** ✨

Hello! I'm your AI learning assistant, here to guide you through our comprehensive Learning Management System.

**I can help you with:**
📚 Course Management & Virtual Classrooms
🎓 Student Progress Tracking
📊 Learning Analytics & Reports
💼 Corporate Training Solutions
⚙️ Technical Specifications
💰 Pricing & Implementation

**Quick Facts:**
• 5000+ Active Learners
• 25+ Educational Partners
• 92% Student Satisfaction Rate

How can I illuminate your learning journey today? 🚀`,
        timestamp: new Date(),
        id: 'welcome-message'
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  return (
    <>
      {/* Floating Chat Button with Glass Morphism */}
      {showChatButton && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in duration-500">
          <Button
            onClick={openChat}
            className="relative group rounded-full w-16 h-16 shadow-2xl bg-linear-to-br from-amber-500/90 to-orange-600/90 hover:from-amber-500 hover:to-orange-600 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30 hover:border-white/50"
            size="icon"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-400 to-orange-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <GraduationCap className="h-8 w-8 text-white relative z-10" />
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-20"></div>
            
            <span className="sr-only">Open Bright Path Academy Chat</span>
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-20 right-0 bg-white/90 backdrop-blur-sm text-amber-600 px-4 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-amber-200">
            Chat with Bright Path Academy
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white/90 transform rotate-45 border-r border-b border-amber-200"></div>
          </div>
        </div>
      )}

      {/* Chat Window with Glass Morphism */}
      {isOpen && (
        <div className="fixed bottom-0 sm:bottom-6 sm:right-6 right-0 z-50 w-full sm:w-[calc(100vw-3rem)] sm:max-w-sm sm:h-150 h-full animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Glass morphism card */}
          <Card className="relative w-full h-full py-0 flex flex-col shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-0 bg-linear-to-br from-white/90 to-white/80 dark:from-gray-900/90 dark:to-gray-800/80 backdrop-blur-xl">
            
            {/* Animated background linear */}
            <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-orange-500/10 to-amber-500/10 animate-linear-shift"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-linear-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-br from-orange-600/20 to-amber-500/20 rounded-full blur-3xl"></div>
            
            {/* Header with glass morphism */}
            <CardHeader className="relative h-17.5 py-3 px-4 bg-linear-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 backdrop-blur-md border-b border-amber-200/30 shrink-0">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-linear-to-br from-amber-500 to-orange-600 p-2 rounded-full shadow-lg">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold leading-tight bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      Bright Path Academy
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-500" />
                      <p className="text-xs text-amber-600/80 leading-tight">
                        AI Learning Assistant
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
                    onClick={clearChat}
                    title="Clear chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-amber-500/10 hover:text-amber-600 transition-colors"
                    onClick={closeChat}
                    title="Minimize chat"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative flex-1 p-0 flex flex-col min-h-0">
              {/* Messages Area */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-amber-500/20 scrollbar-track-transparent"
              >
                {messages.map((message, index) => (
                  <div key={message.id} className="space-y-2">
                    {/* Message Bubble */}
                    <div
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar with glass morphism */}
                      <div
                        className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-md ${
                          message.role === 'user'
                            ? 'bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-lg'
                            : 'bg-white/80 dark:bg-gray-800/80 text-amber-600 shadow-lg border border-amber-200/50'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <GraduationCap className="h-4 w-4" />
                        )}
                      </div>

                      {/* Message Content with glass morphism */}
                      <div
                        className={`relative max-w-[80%] rounded-2xl px-4 py-3 backdrop-blur-md ${
                          message.role === 'user'
                            ? 'bg-linear-to-br from-amber-500 to-orange-600 text-white rounded-br-none shadow-lg'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-lg border border-amber-200/30'
                        }`}
                      >
                        {editingMessageId === message.id ? (
                          // Edit mode
                          <div className="space-y-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-transparent text-foreground resize-none outline-none"
                              rows={3}
                              autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="h-7 text-xs bg-white/50 backdrop-blur-sm"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(message.id)}
                                className="h-7 text-xs bg-linear-to-r from-amber-500 to-orange-600 text-white"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // Display mode
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {formatMessage(message.content)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time and Actions - Positioned below message bubble */}
                    <div
                      className={`flex items-center gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Edit button for user messages */}
                        {message.role === 'user' && editingMessageId !== message.id && (
                          <button
                            onClick={() => handleEditMessage(message.id, message.content)}
                            className="text-xs text-amber-600/70 hover:text-amber-600 transition-colors"
                            title="Edit message"
                          >
                            Edit
                          </button>
                        )}

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className={`relative p-1 ml-8 rounded transition-colors ${
                            message.role === 'user'
                              ? 'text-white/70 hover:bg-white/20'
                              : 'text-amber-600/70 hover:bg-amber-500/10'
                          }`}
                          title={copiedMessageId === message.id ? "Copied!" : "Copy message"}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                          
                          {/* Tooltip */}
                          {copiedMessageId === message.id && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </div>
                          )}
                        </button>

                        {/* Time */}
                        <p
                          className={`text-xs ${
                            message.role === 'user'
                              ? 'text-white/70'
                              : 'text-amber-600/70'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Indicator with glass morphism */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center border border-amber-200/50">
                      <GraduationCap className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl rounded-bl-none px-4 py-3 border border-amber-200/30 shadow-lg">
                      <div className="flex gap-1 items-center">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-amber-500 rounded-full animate-bounce" />
                          <div className="h-2 w-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="h-2 w-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs text-amber-600/70 ml-2">
                          Lighting the path...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area with glass morphism */}
              <div className="relative h-22.5 shrink-0 p-4 border-t border-amber-200/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md flex flex-col justify-center">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about Bright Path Academy..."
                      className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200/50 focus:border-amber-500 focus:ring-amber-500/20 pr-10"
                      disabled={isLoading}
                    />
                    <BookOpen className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-400/50" />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-amber-600/60 text-center mt-2 leading-tight">
                  ✨ Illuminate your learning journey with Bright Path Academy
                </p>
              </div>
            </CardContent>

            {/* Decorative corner elements */}
            <div className="absolute top-3 left-3 w-2 h-2 bg-amber-500/30 rounded-full"></div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-orange-500/30 rounded-full"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 bg-amber-500/30 rounded-full"></div>
            <div className="absolute bottom-3 right-3 w-2 h-2 bg-orange-500/30 rounded-full"></div>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes linear-shift {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-linear-shift {
          animation: linear-shift 8s ease-in-out infinite;
        }
        
        /* Custom scrollbar styles */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2);
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.3);
        }
      `}</style>
    </>
  )
}