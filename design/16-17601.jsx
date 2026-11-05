const imgSmile = "https://www.figma.com/api/mcp/asset/6eea7da5-9ae5-4449-9028-ea3453e491d5.svg";

export default function Quan1() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:17601" data-name="Quân 1.">
      <div className="absolute content-stretch flex h-[38px] items-center justify-between left-[20px] top-[69px] w-[388px]" data-node-id="16:17602">
        <div className="bg-[var(--background,#faf9f3)] content-stretch flex h-[38px] items-center justify-center p-[10px] relative rounded-[12px] shrink-0 w-[66px]" data-node-id="16:17603">
          <button className="[word-break:break-word] block cursor-pointer font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#245e45] text-[16px] text-left whitespace-nowrap" data-node-id="16:17604">
            <p className="leading-[normal]">Huỷ</p>
          </button>
        </div>
        <div className="bg-[var(--btn,#eaf1e6)] content-stretch flex h-[38px] items-center justify-center p-[10px] relative rounded-[16px] shrink-0 w-[66px]" data-node-id="16:17605">
          <a className="[word-break:break-word] block cursor-pointer font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[16px] text-[color:var(--btn-select\,-icon,#245e45)] whitespace-nowrap" data-node-id="16:17606">
            <p className="leading-[normal]">Lưu</p>
          </a>
        </div>
      </div>
      <div className="[word-break:break-word] absolute h-[51px] leading-[normal] left-[20px] not-italic top-[126px] w-[299px]" data-node-id="16:17607">
        <p className="absolute font-['Inter:Regular'] font-normal left-[calc(50%-149.5px)] text-[14px] text-[color:var(--text,#717c73)] top-[34px] w-[299px]" data-node-id="16:17608">
          Bạn có thể chỉnh sửa tiểu sử bất cứ lúc nào.
        </p>
        <p className="absolute font-['Inter:Semi_Bold'] font-semibold left-[calc(50%-149.5px)] text-[20px] text-[color:var(--tiltle,#203c30)] top-0 w-[74.491px]" data-node-id="16:17609">
          Tiểu sử
        </p>
      </div>
      <div className="absolute h-[161px] left-[20px] top-[201px] w-[388px]" data-node-id="16:17610">
        <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-[357.9px] not-italic text-[10px] text-[color:var(--text,#717c73)] top-[149px] w-[30.099px]" data-node-id="16:17611">
          0/100
        </p>
        <div className="-translate-x-1/2 absolute border border-[var(--btn-select\,-icon,#245e45)] border-solid h-[144px] left-1/2 rounded-[10px] top-0 w-[388px]" data-node-id="16:17612">
          <div className="absolute h-[20px] left-[15.92px] top-[14px] w-[230.493px]" data-node-id="16:17613">
            <div className="absolute h-[20px] left-0 top-0 w-[21.146px]" data-node-id="16:17614" data-name="smile">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSmile} />
            </div>
            <div className="absolute h-[17px] left-[31.72px] top-px w-[198.774px]" data-node-id="16:17619">
              <p className="[word-break:break-word] absolute font-['Inter:Regular'] font-normal leading-[normal] left-0 not-italic text-[14px] text-[color:var(--text,#717c73)] top-[calc(50%-8.5px)] whitespace-nowrap" data-node-id="16:17620">
                Chỉnh sửa tiểu sử của bạn...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
