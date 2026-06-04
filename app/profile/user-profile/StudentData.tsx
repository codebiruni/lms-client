/* eslint-disable @next/next/no-img-element */
"use client";

import GETDATA from "@/app/default/functions/GetData";
import POSTDATA from "@/app/default/functions/Post";
import PATCHDATA from "@/app/default/functions/Patch";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface StudentProfileData {
  _id?: string;
  userId?: string;
  profileImage?: string;
  studentNameBn: string;
  studentNameEn: string;
  dateOfBirth: string;
  nidOrBirthNo: string;
  gender: "male" | "female";
  bloodGroup?: string;
  isExpatriate: boolean;
  country?: string;
  whatsappNumber?: string;
  previousInstitute?: string;
  fatherName: string;
  fatherProfession?: string;
  fatherPhone: string;
  motherName: string;
  motherPhone?: string;
  guardianIsExpatriate: boolean;
  guardianCountry?: string;
  guardianWhatsapp?: string;
  emergencyContactName: string;
  emergencyPhone: string;
  presentAddress: string;
  permanentAddress: string;
}

export default function StudentData() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [existingData, setExistingData] = useState<StudentProfileData | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");

  const [formData, setFormData] = useState<StudentProfileData>({
    studentNameBn: "",
    studentNameEn: "",
    dateOfBirth: "",
    nidOrBirthNo: "",
    gender: "male",
    bloodGroup: "",
    isExpatriate: false,
    country: "",
    whatsappNumber: "",
    previousInstitute: "",
    fatherName: "",
    fatherProfession: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    guardianIsExpatriate: false,
    guardianCountry: "",
    guardianWhatsapp: "",
    emergencyContactName: "",
    emergencyPhone: "",
    presentAddress: "",
    permanentAddress: "",
  });

  // Fetch existing data on component mount
  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      setLoading(true);
      const response = await GETDATA("/v1/student-profile/me");
      if (response?.data) {
        setExistingData(response.data);
        setFormData(response.data);
        if (response.data.profileImage) {
          setProfileImagePreview(response.data.profileImage);
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
    } else if (name === "studentNameEn") {
      setFormData((prev) => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Create FormData to handle file upload
      const submitFormData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach((key) => {
        const value = formData[key as keyof StudentProfileData];
        if (value !== undefined && value !== null && value !== "") {
          submitFormData.append(key, String(value));
        }
      });
      
      // Append image file if selected
      if (profileImageFile) {
        submitFormData.append("profileImage", profileImageFile);
      }

      if (existingData && isEditing) {
        await PATCHDATA(`/v1/student-profile/${existingData._id}`, submitFormData);
        alert("প্রোফাইল আপডেট successfully!");
      } else {
        await POSTDATA("/v1/student-profile", submitFormData);
        alert("প্রোফাইল তৈরি successfully!");
      }

      router.refresh();
      await fetchMyProfile();
      setIsEditing(false);
      setProfileImageFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (existingData) {
      setFormData(existingData);
      setProfileImagePreview(existingData.profileImage || "");
    } else {
      setFormData({
        studentNameBn: "",
        studentNameEn: "",
        dateOfBirth: "",
        nidOrBirthNo: "",
        gender: "male",
        bloodGroup: "",
        isExpatriate: false,
        country: "",
        whatsappNumber: "",
        previousInstitute: "",
        fatherName: "",
        fatherProfession: "",
        fatherPhone: "",
        motherName: "",
        motherPhone: "",
        guardianIsExpatriate: false,
        guardianCountry: "",
        guardianWhatsapp: "",
        emergencyContactName: "",
        emergencyPhone: "",
        presentAddress: "",
        permanentAddress: "",
      });
      setProfileImageFile(null);
      setProfileImagePreview("");
    }
    setIsEditing(false);
    setActiveTab(1);
  };

  const nextTab = () => {
    if (activeTab < 3) setActiveTab(activeTab + 1);
  };

  const prevTab = () => {
    if (activeTab > 1) setActiveTab(activeTab - 1);
  };

  if (loading && !existingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (existingData && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
              <button
                onClick={handleEdit}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                সম্পাদনা করুন
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              {profileImagePreview && (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  শিক্ষার্থীর তথ্য
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">নাম (বাংলা):</span>{" "}
                    {existingData.studentNameBn}
                  </p>
                  <p>
                    <span className="font-semibold">নাম (ইংরেজি):</span>{" "}
                    {existingData.studentNameEn}
                  </p>
                  <p>
                    <span className="font-semibold">জন্ম তারিখ:</span>{" "}
                    {existingData.dateOfBirth}
                  </p>
                  <p>
                    <span className="font-semibold">এনআইডি/জন্ম নিবন্ধন:</span>{" "}
                    {existingData.nidOrBirthNo}
                  </p>
                  <p>
                    <span className="font-semibold">জেন্ডার:</span>{" "}
                    {existingData.gender === "male" ? "ছাত্র" : "ছাত্রী"}
                  </p>
                  {existingData.bloodGroup && (
                    <p>
                      <span className="font-semibold">রক্তের গ্রুপ:</span>{" "}
                      {existingData.bloodGroup}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">প্রবাসী:</span>{" "}
                    {existingData.isExpatriate ? "হ্যাঁ" : "না"}
                  </p>
                  {existingData.country && (
                    <p>
                      <span className="font-semibold">দেশ:</span>{" "}
                      {existingData.country}
                    </p>
                  )}
                  {existingData.whatsappNumber && (
                    <p>
                      <span className="font-semibold">হোয়াটসঅ্যাপ:</span>{" "}
                      {existingData.whatsappNumber}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  অভিভাবকের তথ্য
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">পিতার নাম:</span>{" "}
                    {existingData.fatherName}
                  </p>
                  <p>
                    <span className="font-semibold">পিতার মোবাইল:</span>{" "}
                    {existingData.fatherPhone}
                  </p>
                  <p>
                    <span className="font-semibold">মাতার নাম:</span>{" "}
                    {existingData.motherName}
                  </p>
                  {existingData.motherPhone && (
                    <p>
                      <span className="font-semibold">মাতার মোবাইল:</span>{" "}
                      {existingData.motherPhone}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">জরুরি যোগাযোগ:</span>{" "}
                    {existingData.emergencyContactName}
                  </p>
                  <p>
                    <span className="font-semibold">জরুরি মোবাইল:</span>{" "}
                    {existingData.emergencyPhone}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-blue-600 mb-4">
                  ঠিকানা
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-semibold">বর্তমান ঠিকানা:</span>{" "}
                    {existingData.presentAddress}
                  </p>
                  <p>
                    <span className="font-semibold">স্থায়ী ঠিকানা:</span>{" "}
                    {existingData.permanentAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form Component (Create or Edit)
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 md:p-6 text-white">
          <h1 className="text-xl md:text-2xl font-bold text-center">
            {existingData ? "প্রোফাইল সম্পাদনা করুন" : "শিক্ষার্থী ফরম"}
          </h1>
          <p className="text-center text-sm mt-2">
            ধাপ {activeTab} / ৩
          </p>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 1
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            ১. শিক্ষার্থীর তথ্য
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 2
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            ২. অভিভাবকের তথ্য
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 3
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            ৩. যোগাযোগের তথ্য
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {/* Tab 1: Student Information */}
          {activeTab === 1 && (
            <div className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {profileImagePreview ? (
                    <div className="relative">
                      <img
                        src={profileImagePreview}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                      />
                      <button
                        onClick={() => {
                          setProfileImageFile(null);
                          setProfileImagePreview("");
                        }}
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  শিক্ষার্থীর পূর্ণ নাম (বাংলায়) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentNameBn"
                  value={formData.studentNameBn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  শিক্ষার্থীর নাম (English CAPITAL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentNameEn"
                  value={formData.studentNameEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  placeholder="MD RAKIB HASAN"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  জন্ম তারিখ <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  এনআইডি/জন্ম নিবন্ধন নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nidOrBirthNo"
                  value={formData.nidOrBirthNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  জেন্ডার <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={() => handleRadioChange("gender", "male")}
                      className="mr-2"
                    />
                    ছাত্র
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={() => handleRadioChange("gender", "female")}
                      className="mr-2"
                    />
                    ছাত্রী
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  রক্তের গ্রুপ
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  আপনি কি প্রবাসী? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isExpatriate"
                      checked={formData.isExpatriate === true}
                      onChange={() => handleRadioChange("isExpatriate", true)}
                      className="mr-2"
                    />
                    হ্যাঁ
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isExpatriate"
                      checked={formData.isExpatriate === false}
                      onChange={() => handleRadioChange("isExpatriate", false)}
                      className="mr-2"
                    />
                    না
                  </label>
                </div>
              </div>

              {formData.isExpatriate && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      বর্তমান অবস্থানরত দেশ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      হোয়াটসঅ্যাপ নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="+8801234567890"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  পূর্ববর্তী শিক্ষাপ্রতিষ্ঠানের নাম
                </label>
                <input
                  type="text"
                  name="previousInstitute"
                  value={formData.previousInstitute}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Parents Information */}
          {activeTab === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  পিতার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  পিতার পেশা
                </label>
                <input
                  type="text"
                  name="fatherProfession"
                  value={formData.fatherProfession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  পিতার মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="fatherPhone"
                  value={formData.fatherPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  মাতার নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  মাতার মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  name="motherPhone"
                  value={formData.motherPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  অভিভাবক কি প্রবাসী? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="guardianIsExpatriate"
                      checked={formData.guardianIsExpatriate === true}
                      onChange={() =>
                        handleRadioChange("guardianIsExpatriate", true)
                      }
                      className="mr-2"
                    />
                    হ্যাঁ
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="guardianIsExpatriate"
                      checked={formData.guardianIsExpatriate === false}
                      onChange={() =>
                        handleRadioChange("guardianIsExpatriate", false)
                      }
                      className="mr-2"
                    />
                    না
                  </label>
                </div>
              </div>

              {formData.guardianIsExpatriate && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      প্রবাসী হলে (বর্তমান অবস্থানরত দেশ){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="guardianCountry"
                      value={formData.guardianCountry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      হোয়াটসঅ্যাপ নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="guardianWhatsapp"
                      value={formData.guardianWhatsapp}
                      onChange={handleInputChange}
                      required
                      placeholder="+8801234567890"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab 3: Contact Information */}
          {activeTab === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  জরুরি যোগাযোগের নাম ও সম্পর্ক{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleInputChange}
                  required
                  placeholder="যথা: জনাব রফিক (চাচা)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  জরুরি মোবাইল নম্বর <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  বর্তমান ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="বাড়ি, রোড, এলাকা - যেমন: বাড্ডা, ঢাকা"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  স্থায়ী ঠিকানা <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="গ্রাম, পোস্ট অফিস, উপজেলা, জেলা"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {activeTab > 1 && (
              <button
                onClick={prevTab}
                type="button"
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                পেছনে
              </button>
            )}
            {activeTab < 3 && (
              <button
                onClick={nextTab}
                type="button"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto"
              >
                পরবর্তী
              </button>
            )}
            {activeTab === 3 && (
              <div className="flex gap-4 w-full">
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex-1 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  বাতিল করুন
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  type="button"
                  className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading
                    ? "সাবমিট হচ্ছে..."
                    : existingData
                    ? "আপডেট করুন"
                    : "সাবমিট করুন"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}