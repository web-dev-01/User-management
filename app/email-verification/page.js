"use client";

export default function EmailVerification() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1A3C34]">
      <div className="bg-[#1E2A32] p-8 rounded-xl w-full max-w-md shadow-lg text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Email Verification</h2>
        <p className="text-gray-400 mb-6">A verification link has been sent to your email. Please verify to proceed.</p>
        <button className="bg-[#00ED64] text-[#1A3C34] py-3 px-6 rounded-lg font-semibold hover:bg-[#00CC55]">Resend Verification Email</button>
      </div>
    </div>
  );
}
