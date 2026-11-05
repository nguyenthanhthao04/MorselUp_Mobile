const imgBiuTngThanhCong = "https://www.figma.com/api/mcp/asset/5fda3430-7f59-49d3-a46c-a480dbef6a48.svg";

export default function Tho14C() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:16985" data-name="Thảo. 14C">
      <div className="absolute h-[61px] left-0 top-[51px] w-[428px]" data-node-id="16:16986">
        <div className="absolute bg-[var(--btn,#eaf1e6)] h-[61px] left-0 top-0 w-[428px]" data-node-id="16:16987" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[19px] leading-[normal] left-[24px] not-italic text-[20px] text-[color:var(--btn-select\,-icon,#245e45)] top-[20px] w-[239px]" data-node-id="16:16988">
          Xác nhận đã gửi yêu cầu
        </p>
      </div>
      <div className="-translate-x-1/2 absolute left-1/2 size-[200px] top-[211px]" data-node-id="16:16989" data-name="Biểu tượng thành công">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBiuTngThanhCong} />
      </div>
      <div className="absolute h-[58px] left-[44px] top-[553px] w-[340px]" data-node-id="16:16991">
        <div className="absolute bg-[var(--btn-select\,-icon,#245e45)] h-[58px] left-0 rounded-[15px] top-0 w-[340px]" data-node-id="16:16992" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[17px] leading-[normal] left-[calc(50%-128px)] not-italic text-[16px] text-[color:var(--card,white)] top-[calc(50%-9px)] w-[257px]" data-node-id="16:16993">
          Liên hệ người cần xin thực phẩm
        </p>
      </div>
      <a className="absolute block cursor-pointer h-[58px] left-[116px] top-[620px] w-[196px]" data-node-id="16:16994">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--btn,#eaf1e6)] h-[58px] left-1/2 rounded-[15px] top-1/2 w-[196px]" data-node-id="16:16995" />
        <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[17px] leading-[normal] left-[calc(50%-56px)] not-italic text-[16px] text-[color:var(--btn-select\,-icon,#245e45)] text-left top-[calc(50%-9px)] w-[119px]" data-node-id="16:16996">
          Về Trang Chủ
        </p>
      </a>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-1/2 not-italic text-[20px] text-[color:var(--tiltle,#203c30)] text-center top-[calc(50%-20px)] w-[250px]" data-node-id="16:16997">{`Yêu cầu tặng thực phẩm của bạn đã được gửi đi ! `}</p>
    </div>
  );
}
