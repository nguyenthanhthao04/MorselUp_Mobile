const imgBiuTngThanhCong = "https://www.figma.com/api/mcp/asset/581cfd5b-d6ba-4415-b334-22867321f8af.svg";

export default function Tho14() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:16946" data-name="Thảo. 14">
      <div className="absolute h-[61px] left-0 top-[51px] w-[428px]" data-node-id="16:16947">
        <div className="absolute bg-[var(--btn,#eaf1e6)] h-[61px] left-0 top-0 w-[428px]" data-node-id="16:16948" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[19px] leading-[normal] left-[24px] not-italic text-[20px] text-[color:var(--btn-select\,-icon,#245e45)] top-[20px] w-[239px]" data-node-id="16:16949">
          Xác nhận đã gửi yêu cầu
        </p>
      </div>
      <div className="-translate-x-1/2 absolute left-1/2 size-[200px] top-[211px]" data-node-id="16:16950" data-name="Biểu tượng thành công">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBiuTngThanhCong} />
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-1/2 not-italic text-[20px] text-[color:var(--tiltle,#203c30)] text-center top-[calc(50%-22px)] w-[232px]" data-node-id="16:16952">{`Yêu cầu nhận đồ miễn phí của bạn đã được gửi đi ! `}</p>
      <a className="absolute block cursor-pointer h-[58px] left-[44px] top-[553px] w-[340px]" data-node-id="16:16953">
        <div className="absolute bg-[var(--btn-select\,-icon,#245e45)] h-[58px] left-0 rounded-[15px] top-0 w-[340px]" data-node-id="16:16954" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[17px] leading-[normal] left-[calc(50%-118px)] not-italic text-[16px] text-[color:var(--card,white)] text-left top-[calc(50%-9px)] w-[243px]" data-node-id="16:16955">
          Liên hệ chủ sở hữu thực phẩm
        </p>
      </a>
      <a className="absolute block cursor-pointer h-[58px] left-[116px] top-[620px] w-[196px]" data-node-id="16:16956">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--btn,#eaf1e6)] h-[58px] left-1/2 rounded-[15px] top-1/2 w-[196px]" data-node-id="16:16957" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[17px] leading-[normal] left-[calc(50%-56px)] not-italic text-[16px] text-[color:var(--btn-select\,-icon,#245e45)] text-left top-[calc(50%-9px)] w-[119px]" data-node-id="16:16958">
          Về Trang Chủ
        </p>
      </a>
    </div>
  );
}
