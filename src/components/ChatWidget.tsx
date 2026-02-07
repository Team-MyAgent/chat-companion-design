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

const getSuggestedQuestions = (step: number) => {
  if (step === 0) {
    return [
      "인기 상품 추천해줘",
      "할인 이벤트 정보 알려줘",
      "무료배송 기준이 뭐예요?",
      "반품/교환 정책이 궁금해요",
    ];
  } else if (step === 3) {
    return [
      "배송은 언제 되나요?",
      "배송 추적은 어디서 하나요?",
      "배송지 변경 가능한가요?",
      "배송비는 얼마인가요?",
    ];
  }
  return [
    "인기 상품 추천해줘",
    "할인 이벤트 정보 알려줘",
    "무료배송 기준이 뭐예요?",
    "반품/교환 정책이 궁금해요",
  ];
};

const conversationFlow: { trigger: string; response: Message }[] = [
  {
    trigger: "이 옷 사이즈 있나요?",
    response: {
      id: 2,
      type: "bot",
      text: "네, 말씀하신 **[그레이 캐시미어 니트]** 상품은 S, M, L 사이즈 모두 재고가 충분히 있어요! 😊\n\n평소 착용하시는 사이즈를 알려주시면, 더 정확한 사이즈 추천을 도와드릴 수 있습니다.",
    },
  },
  {
    trigger: "그럼 이 옷 구매하려고 하는데, 혹시 이 옷이랑 잘 어울리는 옷 추천해주실 수 있을까요?",
    response: {
      id: 4,
      type: "bot",
      text: "물론이죠! **[그레이 캐시미어 니트]**와 함께 착용하시면 더욱 세련된 스타일을 완성할 수 있는 상품들을 추천해 드립니다. ✨\n\n아래 상품들을 참고해보세요!",
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
      text: "아, 회원가입 감사 쿠폰 말씀이시군요! 가입을 진심으로 환영합니다. 😊\n\n쿠폰은 결제 단계에서 아주 쉽게 사용하실 수 있어요.\n1️⃣ 결제 페이지 내 [쿠폰/할인 적용] 섹션을 찾아주세요.\n2️⃣ 보유하신 쿠폰 중 **'신규 가입 감사 쿠폰'**을 선택하신 후\n3️⃣ [적용] 버튼을 누르면 즉시 할인이 반영됩니다!\n\n진행하시다가 어려운 점이 생기면 언제든 말씀해주세요. 감사합니다! ✨",
    },
  },
  {
    trigger: "혹시 배송 출발했나요?",
    response: {
      id: 8,
      type: "bot",
      text: '기다려주신 고객님, 주문하신 상품 배송 현황 확인해 드릴게요! 🚚\n\n확인 결과, 고객님의 소중한 상품은 어제(2월 6일) 이미 즐겁게 출발했네요!\n현재 배송사에서 고객님께 부지런히 이동 중이며, **내일인 2월 8일(토)** 중으로 도착할 것으로 예상됩니다.\n\n아래 링크를 클릭하시면 실시간 이동 경로를 바로 확인하실 수 있어요.\n<a href="#" class="underline font-medium">👉 실시간 배송 조회하기</a>',
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

    const flow = conversationFlow[currentStep];

    // 배송 질문 단계: 사용자 메시지 위에 날짜 디바이더 추가
    if (currentStep === 3) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), type: "divider", dividerText: "2026년 2월 7일" },
      ]);
    }

    const userMsg: Message = {
      id: Date.now() + 1,
      type: "user",
      text: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(
      () => {
        setMessages((prev) => [...prev, flow.response]);
        setIsTyping(false);
        setCurrentStep((s) => s + 1);
      },
      currentStep === 3 ? 1200 : 800
    );
  };

  const handleSuggestedQuestion = (text: string) => {
    // 즉시 메시지로 전송
    if (!isTyping && currentStep < conversationFlow.length) {
      const flow = conversationFlow[currentStep];

      // 배송 질문 단계: 사용자 메시지 위에 날짜 디바이더 추가
      if (currentStep === 3) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), type: "divider", dividerText: "2026년 2월 7일" },
        ]);
      }

      const userMsg: Message = {
        id: Date.now() + 1,
        type: "user",
        text: text,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);

      setTimeout(
        () => {
          setMessages((prev) => [...prev, flow.response]);
          setIsTyping(false);
          setCurrentStep((s) => s + 1);
        },
        currentStep === 3 ? 1200 : 800
      );
    }
  };

  const resetChat = () => {
    setMessages([scenarioMessages[0]]);
    setCurrentStep(0);
    setInputValue("");
    setCardIndex(0);
  };

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
        <div className="fixed bottom-24 right-5 z-50 w-[360px] h-[650px] max-h-[85vh] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <span className="text-sm font-semibold">에센스 쇼핑몰 챗봇</span>
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
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-0 flex-grow">
            {messages.map((msg) => {
              if (msg.type === "divider") {
                return (
                  <div key={msg.id} className="flex items-center gap-2 py-2 my-4 animate-in fade-in duration-300">
                    <div className="flex-1 h-px bg-border/50" />
                    <span className="text-[10px] text-muted-foreground px-3">{msg.dividerText}</span>
                    <div className="flex-1 h-px bg-border/50" />
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
                      <p 
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} 
                      />
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

          {/* Suggested Questions */}
          {!isTyping && currentStep < conversationFlow.length && (
            <div className="border-t border-border px-3 py-2.5">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {getSuggestedQuestions(currentStep).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="flex-shrink-0 text-[11px] px-3 py-1.5 bg-transparent border border-border text-foreground rounded-full hover:bg-muted/50 hover:border-primary/30 transition-all whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>
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
