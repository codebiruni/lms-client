/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, X, Send, Minimize2, Check, Sparkles, BookOpen, Heart, Moon, Star } from 'lucide-react'
import Chatbot from '../functions/chatbot'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()

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
        content: 'Sorry, I encountered an error. Please try again or contact us directly at quranicverse21@gmail.com',
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
      '<a href="$2" class="inline-link" style="color: #059669; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">$1</a>'
    );

    // Convert * bullet points to proper • points
    formattedContent = formattedContent.replace(/^\*\s+/gm, '• ');

    // Convert markdown-style formatting to HTML
    formattedContent = formattedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #059669;">$1</strong>')
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
        return `<a href="${url}" class="inline-link url-link" style="color: #059669; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${domain}</a>`;
      }
    );

    // Detect and convert email addresses
    formattedContent = formattedContent.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      (email) => {
        return `<a href="mailto:${email}" class="inline-link email-link" style="color: #059669; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${email}</a>`;
      }
    );

    // Detect and convert phone numbers
    formattedContent = formattedContent.replace(
      /(\+?[\d\s\-\(\)]{10,})/g,
      (phone) => {
        const digitCount = phone.replace(/[^\d]/g, '').length;
        if (digitCount >= 10) {
          const formattedPhone = formatPhoneNumber(phone);
          return `<a href="tel:${phone.replace(/[^\d+]/g, '')}" class="inline-link phone-link" style="color: #059669; text-decoration: underline; font-weight: 500; text-underline-offset: 2px;">${formattedPhone}</a>`;
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
        content: `✨ **Welcome to Quranic Verse Bangladesh!** ✨

السلام عليكم ورحمة الله وبركاته

Peace be upon you! I'm your spiritual learning assistant, here to guide you through the beautiful teachings of the Quran and Islamic knowledge.

**📖 I can help you with:**
• Quranic Tafsir & Interpretation
• Islamic Studies & History
• Arabic Language Learning
• Prayer Times & Duas
• Hadith Collections
• Islamic Finance & Ethics

**🌙 Featured Content:**
• Daily Ayah with Tafsir
• Prophetic Stories
• Islamic Calendar Events
• Q&A on Islamic Rulings

How may I assist you in your spiritual journey today? 🤲`,
        timestamp: new Date(),
        id: 'welcome-message'
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/profile')) {
      return null
    }

  return (
    <>
      {/* Floating Chat Button - Fully Responsive */}
      {showChatButton && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 animate-in fade-in duration-500">
          <Button
            onClick={openChat}
            className="relative group rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-2xl bg-gradient-to-br from-emerald-600/90 to-teal-700/90 hover:from-emerald-600 hover:to-teal-700 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/30 hover:border-white/50"
            size="icon"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            {/* Icon */}
            <Moon className="h-6 w-6 sm:h-8 sm:w-8 text-white relative z-10" />
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-20"></div>
            
            <span className="sr-only">Open Quranic Verse Bangladesh Chat</span>
          </Button>
          
          {/* Tooltip - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:block absolute bottom-20 right-0 bg-white/90 backdrop-blur-sm text-emerald-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-xl text-xs sm:text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-emerald-200">
            Chat with Quranic Verse Bangladesh
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white/90 transform rotate-45 border-r border-b border-emerald-200"></div>
          </div>
        </div>
      )}

      {/* Chat Window - Fully Responsive */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 z-50 w-full sm:w-[90vw] md:w-[85vw] lg:w-[450px] sm:max-w-[450px] h-[100dvh] sm:h-[500px] md:h-[500px] animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Glass morphism card */}
          <Card className="relative w-full h-full py-0 flex flex-col shadow-2xl rounded-none sm:rounded-2xl overflow-hidden border-0 bg-gradient-to-br from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-800/90 backdrop-blur-xl">
            
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-emerald-500/5 animate-linear-shift"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-teal-600/20 to-emerald-500/20 rounded-full blur-3xl"></div>
            
            {/* Header - Responsive padding */}
            <CardHeader className="relative py-3 px-3 sm:py-4 sm:px-6 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 backdrop-blur-md border-b border-emerald-200/30 shrink-0">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-1.5 sm:p-2 rounded-full shadow-lg">
                      <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg font-bold leading-tight bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                      Quranic Verse Bangladesh
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-500" />
                      <p className="text-[10px] sm:text-xs text-emerald-600/80 leading-tight">
                        Spiritual Guide
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                    onClick={closeChat}
                    title="Minimize chat"
                  >
                    <Minimize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative flex-1 p-0 flex flex-col min-h-0 overflow-hidden">
              {/* Messages Area - Responsive padding */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent"
              >
                {messages.map((message) => (
                  <div key={message.id} className="space-y-1 sm:space-y-2">
                    {/* Message Bubble */}
                    <div
                      className={`flex gap-2 sm:gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center backdrop-blur-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg'
                            : 'bg-white/80 dark:bg-gray-800/80 text-emerald-600 shadow-lg border border-emerald-200/50'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ) : (
                          <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`relative max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-md ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-br-none shadow-lg'
                            : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-lg border border-emerald-200/30'
                        }`}
                      >
                        {editingMessageId === message.id ? (
                          // Edit mode
                          <div className="space-y-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-transparent text-foreground resize-none outline-none text-sm"
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
                                className="h-7 text-xs bg-gradient-to-r from-emerald-600 to-teal-700 text-white"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // Display mode
                          <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words">
                            {formatMessage(message.content)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time and Actions */}
                    <div
                      className={`flex items-center gap-2 sm:gap-3 px-1 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Edit button for user messages */}
                        {message.role === 'user' && editingMessageId !== message.id && (
                          <button
                            onClick={() => handleEditMessage(message.id, message.content)}
                            className="text-[10px] sm:text-xs text-emerald-600/70 hover:text-emerald-600 transition-colors"
                            title="Edit message"
                          >
                            Edit
                          </button>
                        )}

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className={`relative p-0.5 sm:p-1 rounded transition-colors ${
                            message.role === 'user'
                              ? 'text-white/70 hover:bg-white/20'
                              : 'text-emerald-600/70 hover:bg-emerald-500/10'
                          }`}
                          title={copiedMessageId === message.id ? "Copied!" : "Copy message"}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-500" />
                          ) : (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="sm:w-3 sm:h-3"
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
                          className={`text-[9px] sm:text-xs ${
                            message.role === 'user'
                              ? 'text-white/70'
                              : 'text-emerald-600/70'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-2 sm:gap-3">
                    <div className="shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-center border border-emerald-200/50">
                      <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-600" />
                    </div>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl rounded-bl-none px-3 py-2 sm:px-4 sm:py-3 border border-emerald-200/30 shadow-lg">
                      <div className="flex gap-1 items-center">
                        <div className="flex gap-1">
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500 rounded-full animate-bounce" />
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-[10px] sm:text-xs text-emerald-600/70 ml-2">
                          Reflecting on your question...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area - Responsive padding */}
              <div className="relative shrink-0 p-3 sm:p-4 border-t border-emerald-200/30 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about Quran, Hadith, or Islamic knowledge..."
                      className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-emerald-200/50 focus:border-emerald-500 focus:ring-emerald-500/20 pr-8 sm:pr-10 text-sm"
                      disabled={isLoading}
                    />
                    <BookOpen className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-400/50" />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shrink-0 h-9 w-9 sm:h-10 sm:w-10"
                  >
                    <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </Button>
                </div>
                <p className="text-[9px] sm:text-xs text-emerald-600/60 text-center mt-2 leading-tight">
                  🤲 Seek knowledge from the cradle to the grave
                </p>
              </div>
            </CardContent>

            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500/30 rounded-full"></div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500/30 rounded-full"></div>
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500/30 rounded-full"></div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-500/30 rounded-full"></div>
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
          background: rgba(16, 185, 129, 0.2);
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.3);
        }
        
        /* Touch-friendly tap targets for mobile */
        @media (max-width: 640px) {
          button, 
          [role="button"],
          .inline-link {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Smooth scrolling for iOS */
        .overflow-y-auto {
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </>
  )
}