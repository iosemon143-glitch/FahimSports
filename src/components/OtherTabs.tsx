import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Heart,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Trash2,
  ThumbsUp,
  MessageCircle as CommentIcon,
  Share2,
  CheckCircle2,
  ExternalLink,
  Send,
  User,
  Bot,
} from 'lucide-react';
import { Product, NavTab } from '../types';
import originalPageLogo from '../assets/images/original_fahim_sports_logo.jpg';
import { triggerHaptic } from '../utils/haptics';
import { formatBDT } from '../utils/currency';

interface OtherTabsProps {
  activeTab: NavTab;
  products: Product[];
  wishlist: string[];
  onSelectProduct: (p: Product) => void;
  onRemoveWishlist: (id: string) => void;
  onGoHome: () => void;
}

export const OtherTabs = React.memo<OtherTabsProps>(({
  activeTab,
  products,
  wishlist,
  onSelectProduct,
  onRemoveWishlist,
  onGoHome,
}) => {
  const FACEBOOK_PAGE_URL = 'https://www.facebook.com/share/19HtigNNek/';
  const [isFacebookFollowed, setIsFacebookFollowed] = useState(false);
  const [postLikes, setPostLikes] = useState(1420);
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  // Sports Concierge Live Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! I am your Fahim Sports Gear specialist. Ask me anything about jersey sizes, cleat studs, bat weights, or delivery.',
      time: '9:41 AM',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const message = textToSend || inputMessage.trim();
    if (!message) return;

    triggerHaptic('light');
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      text: message,
      time: 'Just now',
    };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      triggerHaptic('selection');

      let reply = "Our gear specialists are available to verify your fit! Feel free to pick your size directly on any product page.";
      const lower = message.toLowerCase();
      if (lower.includes('size') || lower.includes('fit') || lower.includes('chart')) {
        reply = "For athletic jerseys, we recommend your true standard size for an athletic match fit, or one size up for a relaxed lifestyle look!";
      } else if (lower.includes('cleat') || lower.includes('shoe') || lower.includes('turf') || lower.includes('grass')) {
        reply = "Our multi-ground FG/AG cleats feature engineered conical TPU studs designed for superior grip on both natural grass and modern turf pitches.";
      } else if (lower.includes('delivery') || lower.includes('shipping') || lower.includes('cod') || lower.includes('cash')) {
        reply = "We offer nationwide Cash on Delivery with 24-hour express dispatch in Dhaka! All orders are carefully quality-checked before packing.";
      } else if (lower.includes('bat') || lower.includes('cricket')) {
        reply = "Our English & Kashmir willow bats are pre-knocked with thick contoured edges, balanced sweet spots, and rubberized feather-light grips!";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 900);
  };

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (activeTab === 'wishlist') {
    return (
      <div className="w-full pt-2 px-4 pb-6 space-y-4 select-none">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#141416] flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF6B00] fill-[#FF6B00]" />
            <span>My Wishlist</span>
          </h2>
          <span className="text-xs font-semibold bg-orange-100 text-[#FF6B00] px-2.5 py-1 rounded-full">
            {wishlistedProducts.length} items
          </span>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center shadow-card border border-gray-100 mt-6">
            <div className="w-16 h-16 bg-orange-50 text-[#FF6B00] rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-base font-bold text-[#141416]">Your wishlist is empty</h3>
            <p className="text-xs text-gray-500 mt-1 mb-4">
              Tap the heart icon on any product to save your favorite sports gear.
            </p>
            <button
              onClick={onGoHome}
              className="bg-[#FF6B00] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {wishlistedProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm border border-gray-100"
              >
                <div
                  onClick={() => onSelectProduct(p)}
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <div className="w-16 h-16 bg-[#F3F4F8] rounded-xl flex items-center justify-center p-1">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#141416] line-clamp-1">{p.name}</h4>
                    <p className="text-xs text-[#777E90]">{p.subtitle}</p>
                    <span className="text-sm font-black text-[#FF6B00] mt-1 block">
                      {formatBDT(p.price)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onRemoveWishlist(p.id)}
                    className="w-9 h-9 rounded-full bg-gray-100 text-gray-400 hover:text-red-500 flex items-center justify-center"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onSelectProduct(p)}
                    className="h-9 px-3 rounded-full bg-[#141416] text-white text-xs font-bold hover:bg-[#FF6B00] transition-colors"
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="w-full pt-2 px-4 pb-6 space-y-4 select-none">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#141416] flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#FF6B00]" />
            <span>Notifications & Updates</span>
          </h2>
        </div>

        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#141416]">New Season Drop Available</h4>
                <span className="text-[10px] text-gray-400">10m ago</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Up to 30% OFF on all pro athletic jerseys and footwear. Limited inventory!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ArrowRight className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#141416]">Order Shipped #SP-99201</h4>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
              <p className="text-xs text-gray-600 mt-0.5">
                Your high-traction football shoes are on the way. Expected delivery tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'chat') {
    return (
      <div className="w-full pt-2 px-4 pb-6 space-y-4 select-none">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-[#141416] flex items-center gap-1.5">
                <span>Sports Concierge</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              </h2>
              <p className="text-[11px] font-semibold text-emerald-600">Online • Certified Sports Fitters</p>
            </div>
          </div>

          <a
            href="https://wa.me/8801700000000?text=Hi%20Fahim%20Sports%20I%20need%20gear%20advice"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {[
            { label: 'Jersey Size Guide 👕', query: 'What size jersey should I buy?' },
            { label: 'Cleats for Turf ⚽', query: 'Which cleats are best for turf?' },
            { label: '24h Delivery & COD ⚡', query: 'How does cash on delivery work?' },
            { label: 'Cricket Bat Specs 🏏', query: 'Tell me about cricket bat balance and weight.' },
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip.query)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-[#141416] text-[11px] font-bold hover:border-[#FF6B00] hover:text-[#FF6B00] transition-all shadow-xs cursor-pointer"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="bg-white rounded-[28px] p-4 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-3 min-h-[300px] flex flex-col justify-between">
          <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1 no-scrollbar">
            {chatMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                className={`flex items-end space-x-2 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mb-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] px-3.5 py-2.5 rounded-[20px] text-xs font-medium leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#FF6B00] text-white rounded-br-xs shadow-xs'
                      : 'bg-[#F4F6F9] text-[#141416] rounded-bl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] font-bold block mt-1 ${
                      msg.sender === 'user' ? 'text-white/75 text-right' : 'text-gray-400'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center flex-shrink-0 mb-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Live Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-xs text-gray-500 pl-9"
              >
                <div className="flex space-x-1 py-1 px-3 bg-gray-100 rounded-full">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                </div>
                <span className="text-[11px] font-medium text-gray-400">Coach is typing...</span>
              </motion.div>
            )}
          </div>

          {/* Interactive Chat Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-2 border-t border-gray-100 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about size, specs, cleats..."
              className="flex-1 bg-[#F3F4F8] text-xs font-medium text-[#141416] placeholder-gray-400 px-4 py-3 rounded-full border border-transparent focus:border-[#FF6B00]/50 focus:bg-white focus:outline-none transition-all"
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.88 }}
              disabled={!inputMessage.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                inputMessage.trim()
                  ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/30'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4 ml-0.5" />
            </motion.button>
          </form>
        </div>
      </div>
    );
  }

  // Facebook Official Athlete Community Tab
  return (
    <div
      className="w-full pt-2 px-4 pb-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#141416] flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xs">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <span>Facebook Page</span>
        </h2>
        <span className="text-[11px] font-bold text-[#1877F2] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] animate-pulse" />
          Verified Page
        </span>
      </div>

      {/* Official Facebook Page Profile Card */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 space-y-3.5">
        <div
          onClick={() => window.open(FACEBOOK_PAGE_URL, '_blank')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          {/* Facebook Page Logo */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-white ring-2 ring-[#1877F2]/20 bg-white group-hover:scale-105 transition-transform">
              <img
                src={originalPageLogo}
                alt="ফাহিম খেলাঘর Logo"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1877F2] text-white flex items-center justify-center ring-2 ring-white shadow-xs">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </span>
          </div>

          {/* Name and Categories */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1.5">
              <h3 className="text-base font-black text-[#141416] group-hover:text-[#1877F2] transition-colors truncate">
                ফাহিম খেলাঘর
              </h3>
              <CheckCircle2 className="w-4 h-4 text-[#1877F2] fill-[#1877F2]/15 flex-shrink-0" />
            </div>
            <p className="text-xs text-gray-500 font-medium">Sporting Goods & Sports Store • Official Page</p>
            <p className="text-[11px] text-gray-400 mt-0.5">@fahimkhelaghor</p>
          </div>
        </div>

        {/* Original Like & Followers Statistics Section */}
        <div className="grid grid-cols-2 gap-2 bg-[#F7F9FD] rounded-2xl p-3 border border-blue-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="w-4 h-4 fill-[#1877F2]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                Likes
              </span>
              <span className="text-sm font-black text-[#141416]">
                {isFacebookFollowed ? '18,421' : '18,420'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 border-l border-gray-200/80 pl-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">
                Followers
              </span>
              <span className="text-sm font-black text-[#141416]">
                {isFacebookFollowed ? '24,581' : '24,580'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setIsFacebookFollowed(!isFacebookFollowed)}
            className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
              isFacebookFollowed
                ? 'bg-blue-50 text-[#1877F2] border border-blue-200'
                : 'bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-md'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isFacebookFollowed ? 'fill-[#1877F2]' : ''}`} />
            <span>{isFacebookFollowed ? 'Following' : 'Follow Page'}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              window.open(FACEBOOK_PAGE_URL, '_blank');
            }}
            className="py-2.5 rounded-xl text-xs font-bold bg-[#141416] text-white hover:bg-black flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <span>Visit Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      {/* Featured Community Facebook Post */}
      <div className="bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-gray-100 space-y-3">
        {/* Post Author Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-100 shadow-xs flex-shrink-0 bg-white">
              <img
                src={originalPageLogo}
                alt="ফাহিম খেলাঘর"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs font-black text-[#141416]">ফাহিম খেলাঘর</span>
                <CheckCircle2 className="w-3 h-3 text-[#1877F2]" />
              </div>
              <span className="text-[10px] text-gray-400">3 hours ago • 🌍 Public</span>
            </div>
          </div>
        </div>

        {/* Post Caption */}
        <p className="text-xs text-gray-700 leading-relaxed font-normal">
          ⚽ <span className="font-bold text-[#141416]">Matchday Ready!</span> All new international and club jerseys, match-grade footballs, cricket bats, and athletic footwear are now in stock at special discounted prices. Order directly with cash on delivery!
        </p>

        {/* Post Banner Preview */}
        <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-4 relative">
          <div className="relative z-10 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">
              Exclusive Page Offer
            </span>
            <h4 className="text-sm font-black">Special Discount on Sports Gear</h4>
            <p className="text-[11px] text-white/80">Tap Buy Now on any product in the Home screen to place your order</p>
          </div>
        </div>

        {/* Post Feedback Counts */}
        <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <span className="w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px]">
              👍
            </span>
            <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px]">
              ❤️
            </span>
            <span className="font-bold text-gray-700">{postLikes}</span>
          </div>
          <span>184 Comments • 92 Shares</span>
        </div>

        {/* Interactive Post Actions (Like, Comment, Share) */}
        <div className="grid grid-cols-3 gap-1 pt-1 border-t border-gray-100 text-xs font-bold text-gray-600">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              if (hasLikedPost) {
                setPostLikes((prev) => prev - 1);
                setHasLikedPost(false);
              } else {
                setPostLikes((prev) => prev + 1);
                setHasLikedPost(true);
              }
            }}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1.5 transition-colors cursor-pointer ${
              hasLikedPost
                ? 'text-[#1877F2] bg-blue-50/70 font-black'
                : 'hover:bg-gray-100'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${hasLikedPost ? 'fill-[#1877F2]' : ''}`} />
            <span>{hasLikedPost ? 'Liked' : 'Like'}</span>
          </motion.button>

          <button
            onClick={() => {
              window.open(FACEBOOK_PAGE_URL, '_blank');
            }}
            className="py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <CommentIcon className="w-4 h-4 text-gray-500" />
            <span>Comment</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard?.writeText(FACEBOOK_PAGE_URL);
              setCopyToast(true);
              setTimeout(() => setCopyToast(false), 2400);
            }}
            className="py-2 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-gray-500" />
            <span>{copyToast ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>
    </div>
  );
});

OtherTabs.displayName = 'OtherTabs';
