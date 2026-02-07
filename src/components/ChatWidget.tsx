import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, ChevronDown, RefreshCw, X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import productSlacks from "@/assets/product-slacks.jpg";
import productSneakers from "@/assets/product-sneakers.jpg";

interface Message {
  id: number;
  type: "bot" | "user" | "divider";
  text?: string;
  cards?: CardItem[];
  dividerText?: string;
}

interface CardItem {
  image: string;
  name: string;
  price: string;
}

const scenarioMessages: Message[] = [
  { id: 0, type: "bot", text: "안녕하세요. 궁금하신 점 있으면 편하게 물어봐주세요! 😊" },
];

const conversationFlow: { trigger: string; response: Message }[] = [
  {
    trigger: "이 옷 사이즈 있나요?",
    response: {
      id: 2,
      type: "bot",
      text: "네 고객님, 문의하신 [그레이 캐시미어 니트] 상품은 S, M, L 사이즈 모두 재고 있습니다. 평소 착용하시는 사이즈를 말씀해 주시면 더 자세히 안내해 드릴 수 있습니다.",
    },
  },
  {
    trigger: "그럼 이 옷 구매하려고 하는데, 혹시 이 옷이랑 잘 어울리는 옷 추천해주실 수 있을까요?",
    response: {
      id: 4,
      type: "bot",
      text: "물론이죠! [그레이 캐시미어 니트]와 함께 착용하시면 더욱 세련된 스타일을 완성할 수 있는 상품들을 추천해 드립니다.",
      cards: [
        { image: productSlacks, name: "루즈핏 와이드 슬랙스", price: "48,000원" },
        { image: productSneakers, name: "미니멀 베이직 스니커즈", price: "79,000원" },
      ],
    },
  },
  {
    trigger: "회원가입하면서 쿠폰을 받았는데 어떻게 사용해요? 쿠폰 사용 방법 알려주세요",
    response: {
      id: 6,
      type: "bot",
      text: "고객님, 회원가입 감사 쿠폰은 결제 단계에서 '쿠폰/할인 적용' 섹션에서 사용하실 수 있습니다. 원하시는 쿠폰을 선택하신 후 '적용' 버튼을 누르시면 총 결제 금액에서 할인됩니다. 궁금한 점이 있으시면 언제든 다시 문의해주세요!",
    },
  },
  {
    trigger: "혹시 배송 출발했나요?",
    response: {
      id: 8,
      type: "bot",
      text: '고객님, 문의하신 주문번호 [20260206-12345] 상품은 어제(2월 6일) 출고되어 현재 \'배송 중\' 상태입니다. 예상 도착일은 2월 8일(토)이며, <a href="#" class="underline font-medium">여기</a>에서 실시간 배송 조회를 하실 수 있습니다.',
    },
  },
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([scenarioMessages[0]]);
  const [inputValue, setInputValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    if (currentStep >= conversationFlow.length) return;

    const userMsg: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    const flow = conversationFlow[currentStep];

    // Add divider before scene 3
    if (currentStep === 3) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, type: "divider", dividerText: "2026년 2월 7일" },
        ]);
      }, 500);
    }

    setTimeout(
      () => {
        setMessages((prev) => [...prev, flow.response]);
        setIsTyping(false);
        setCurrentStep((s) => s + 1);
      },
      currentStep === 3 ? 1200 : 800
    );
  };

  const handleQuickInput = (text: string) => {
    setInputValue(text);
  };

  const resetChat = () => {
    setMessages([scenarioMessages[0]]);
    setCurrentStep(0);
    setInputValue("");
    setCardIndex(0);
  };

  const quickReplies =
    currentStep < conversationFlow.length
      ? [conversationFlow[currentStep].trigger]
      : [];

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="챗봇 열기"
      >
        {isOpen ? <ChevronDown className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-h-[520px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">My Agent 쇼핑몰 챗봇</span>
            <div className="flex items-center gap-2">
              <button onClick={resetChat} className="hover:opacity-70 transition-opacity">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0" style={{ maxHeight: 380 }}>
            {messages.map((msg) => {
              if (msg.type === "divider") {
                return (
                  <div key={msg.id} className="flex items-center gap-2 py-2">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-[10px] text-muted-foreground">{msg.dividerText}</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                );
              }

              const isBotMsg = msg.type === "bot";

              return (
                <div key={msg.id} className={`flex ${isBotMsg ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                      isBotMsg
                        ? "bg-chat-brand text-chat-brand-foreground rounded-tl-sm"
                        : "bg-chat-user text-chat-user-foreground rounded-tr-sm"
                    }`}
                  >
                    {msg.text && (
                      <p dangerouslySetInnerHTML={{ __html: msg.text }} />
                    )}
                    {msg.cards && (
                      <div className="mt-2 relative">
                        <div className="overflow-hidden rounded-lg">
                          <div className="bg-card rounded-lg border border-border overflow-hidden">
                            <img
                              src={msg.cards[cardIndex].image}
                              alt={msg.cards[cardIndex].name}
                              className="w-full h-32 object-cover"
                            />
                            <div className="p-2">
                              <p className="text-xs font-medium text-foreground">
                                {msg.cards[cardIndex].name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {msg.cards[cardIndex].price}
                              </p>
                            </div>
                          </div>
                        </div>
                        {msg.cards.length > 1 && (
                          <div className="flex items-center justify-center gap-3 mt-2">
                            <button
                              onClick={() => setCardIndex(Math.max(0, cardIndex - 1))}
                              className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              disabled={cardIndex === 0}
                            >
                              <ChevronLeft className="w-3 h-3 text-foreground" />
                            </button>
                            <div className="flex gap-1">
                              {msg.cards.map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    i === cardIndex ? "bg-primary-foreground" : "bg-primary-foreground/40"
                                  }`}
                                />
                              ))}
                            </div>
                            <button
                              onClick={() =>
                                setCardIndex(Math.min((msg.cards?.length || 1) - 1, cardIndex + 1))
                              }
                              className="w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                              disabled={cardIndex === (msg.cards?.length || 1) - 1}
                            >
                              <ChevronRight className="w-3 h-3 text-foreground" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-chat-brand text-chat-brand-foreground rounded-xl rounded-tl-sm px-3 py-2.5 text-xs">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {quickReplies.length > 0 && !isTyping && (
            <div className="px-4 pb-2">
              {quickReplies.map((text) => (
                <button
                  key={text}
                  onClick={() => handleQuickInput(text)}
                  className="text-[10px] px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-colors leading-tight"
                >
                  {text.length > 30 ? text.slice(0, 30) + "..." : text}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border px-3 py-2 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="메시지를 입력하세요..."
              className="flex-1 text-xs bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
