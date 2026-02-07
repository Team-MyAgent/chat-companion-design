const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-bold tracking-widest mb-4 text-foreground">MY AGENT</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              모던하고 세련된 패션을 제안하는<br />온라인 셀렉트샵
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wider mb-3 text-foreground">고객센터</h4>
            <p className="text-xs text-muted-foreground leading-loose">
              전화: 02-1234-5678<br />
              평일 10:00 - 18:00<br />
              토/일/공휴일 휴무
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wider mb-3 text-foreground">정보</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">이용약관</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">개인정보처리방침</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">교환/환불 안내</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-wider mb-3 text-foreground">SNS</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="hover:text-foreground cursor-pointer transition-colors">Instagram</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Facebook</li>
              <li className="hover:text-foreground cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-[10px] text-muted-foreground">© 2026 MY AGENT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
