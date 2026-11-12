'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  Info,
  MoreVertical,
  Flag,
  Ban,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/authContext';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function MessagesPage() {
  const {
    conversations,
    messages,
    sendMessage,
    currentUser,
    allProfiles,
  } = useAuth();

  const [activeConvId, setActiveConvId] = useState<string>(
    conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [isContactRequested, setIsContactRequested] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConversation ? messages[activeConversation.id] || [] : [];
  const otherParticipant = activeConversation?.other_participant || allProfiles[1];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const handleRequestContact = () => {
    setIsContactRequested(true);
    if (activeConversation) {
      sendMessage(
        activeConversation.id,
        `🔒 Contact Request Sent: ${currentUser?.full_name} has requested your verified phone number. Once approved, numbers will be securely unlocked.`
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-140px)] min-h-[600px] flex flex-col">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-subtle flex-1 flex overflow-hidden">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full sm:w-80 md:w-96 border-r border-slate-200/80 flex flex-col bg-slate-50/50">
          <div className="p-4 border-b border-slate-200/80 bg-white">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>Messages</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure in-app communication
            </p>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {conversations.map((conv) => {
              const other = conv.other_participant;
              const isActive = conv.id === activeConvId;
              const lastMsg = conv.last_message;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-4 flex items-start gap-3 transition-colors ${
                    isActive ? 'bg-brand-50/70 border-l-4 border-brand-600' : 'hover:bg-slate-100/60'
                  }`}
                >
                  <img
                    src={other?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                    alt={other?.full_name || 'User'}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-slate-900 text-sm truncate">
                        {other?.full_name || 'NestMate User'}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {conv.last_message_at ? new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate">
                      {lastMsg?.content || 'Started a conversation'}
                    </p>

                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">
                        {conv.type === 'direct_match' ? 'Mutual Match' : 'Property Enquiry'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Chat Thread */}
        {activeConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Top Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <img
                  src={otherParticipant?.avatar_url || ''}
                  alt={otherParticipant?.full_name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {otherParticipant?.full_name}
                    </h3>
                    {otherParticipant?.is_verified && (
                      <span className="text-emerald-600 text-xs flex items-center gap-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold">Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {otherParticipant?.occupation} • {otherParticipant?.city}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Request Phone & Report */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRequestContact}
                  disabled={isContactRequested}
                  leftIcon={<Phone className="w-3.5 h-3.5" />}
                >
                  {isContactRequested ? 'Contact Requested' : 'Request Phone Number'}
                </Button>

                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                  title="Report or Block"
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Privacy Shield Notice Banner */}
            <div className="bg-brand-50/60 border-b border-brand-100 px-4 py-2 text-xs text-brand-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600 shrink-0" />
                <span>
                  <strong>NestMate Safe Messaging:</strong> Keep all discussions inside the platform until you are ready to share verified contacts.
                </span>
              </div>
            </div>

            {/* Message Thread Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
              {activeMessages.map((msg) => {
                const isMe = msg.sender_id === currentUser?.id;
                const isSystem = msg.is_system;

                if (isSystem) {
                  return (
                    <div key={msg.id} className="flex justify-center my-4">
                      <div className="bg-brand-50 border border-brand-200 text-brand-900 text-xs px-4 py-2 rounded-2xl max-w-md text-center leading-relaxed flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{msg.content}</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-subtle ${
                        isMe
                          ? 'bg-brand-600 text-white rounded-br-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button type="submit" variant="primary" size="md" rightIcon={<Send className="w-4 h-4" />}>
                Send
              </Button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-8 text-slate-400">
            <div>
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Report / Block Modal */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Trust & Safety Report"
        description={`Report suspicious behavior or offensive interactions from ${otherParticipant?.full_name}`}
      >
        {reportSuccess ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900">Report Submitted</h4>
            <p className="text-xs text-slate-500">
              Our safety moderation team will investigate this account within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReportSuccess(true);
              setTimeout(() => {
                setIsReportModalOpen(false);
                setReportSuccess(false);
              }, 2000);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Report
              </label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs">
                <option value="fake_listing">Fake Listing / Scammer</option>
                <option value="harassment">Inappropriate or Harassing Messages</option>
                <option value="wrong_information">Misleading Information</option>
                <option value="spam">Commercial Spam / Unsolicited Ads</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Details
              </label>
              <textarea
                rows={3}
                placeholder="Explain what happened..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs"
                required
              />
            </div>

            <Button type="submit" variant="danger" size="md" className="w-full">
              Submit Report to Safety Team
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
}
