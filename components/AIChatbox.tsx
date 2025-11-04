
import React, { useState, useRef, useEffect } from 'react';
import type { Company, ChatMessage } from '../types';
import { generateCompanyInsight } from '../services/geminiService';
import { SendIcon, LoadingIcon, BotIcon } from './icons';

interface AIChatboxProps {
  selectedCompany: Company | null;
}

const ChatMessageItem: React.FC<{ message: ChatMessage }> = ({ message }) => {
    const isModel = message.role === 'model';
    return (
        <div className={`flex items-start gap-3 ${isModel ? '' : 'justify-end'}`}>
            {isModel && <BotIcon className="w-8 h-8 flex-shrink-0 text-brand-light p-1 bg-base-300 rounded-full" />}
            <div className={`max-w-md p-3 rounded-lg ${isModel ? 'bg-base-300 text-gray-200' : 'bg-brand-primary text-white'}`}>
                <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    );
};

export const AIChatbox: React.FC<AIChatboxProps> = ({ selectedCompany }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      setMessages([
        { role: 'model', text: `Hi! I'm ConnectWise AI. Ask me anything about ${selectedCompany.name}. What would you like to know?` },
      ]);
    } else {
      setMessages([]);
    }
  }, [selectedCompany]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || !selectedCompany || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await generateCompanyInsight(selectedCompany, input);

    const modelMessage: ChatMessage = { role: 'model', text: responseText };
    setMessages((prev) => [...prev, modelMessage]);
    setIsLoading(false);
  };

  if (!selectedCompany) {
    return (
      <div className="bg-base-200 rounded-lg h-full flex flex-col justify-center items-center p-8 text-center border-2 border-dashed border-base-300">
        <BotIcon className="w-16 h-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300">Select a Company</h3>
        <p className="text-gray-400">Choose a company from the list to start your conversation with the AI Assistant.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-200 rounded-lg h-[70vh] flex flex-col border border-base-300 shadow-xl">
      <div className="p-4 border-b border-base-300">
        <h3 className="font-bold text-lg text-gray-100">Chat with AI about {selectedCompany.name}</h3>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatMessageItem key={index} message={msg} />
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                 <BotIcon className="w-8 h-8 flex-shrink-0 text-brand-light p-1 bg-base-300 rounded-full" />
                <div className="max-w-md p-3 rounded-lg bg-base-300 text-gray-200 flex items-center space-x-2">
                    <LoadingIcon className="w-5 h-5" />
                    <span>Thinking...</span>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-base-300">
        <form onSubmit={handleSendMessage} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about hiring trends, tech stack, etc."
            className="w-full pr-12 py-3 bg-base-300 text-content rounded-full border border-gray-600 focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute inset-y-0 right-0 m-1.5 w-10 h-10 flex items-center justify-center bg-brand-primary text-white rounded-full disabled:bg-base-300 disabled:text-gray-500 hover:bg-brand-secondary transition-colors"
          >
            {isLoading ? <LoadingIcon className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};
