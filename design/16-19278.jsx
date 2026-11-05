const imgRectangle33 = "https://www.figma.com/api/mcp/asset/9c65c856-57d5-48ba-a37b-b9c30664a430.png";
const imgVector = "https://www.figma.com/api/mcp/asset/f65bd524-aeac-4ebc-a46a-1fa8bd76219c.png";
const imgFamiconsChevronBackSharp = "https://www.figma.com/api/mcp/asset/f8660df6-4351-4b79-a265-85e473cefb84.svg";

export default function Lun3ToBaiHiDap() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:19278" data-name="Luận 3.Tạo bài hỏi đáp">
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col h-[591px] items-center justify-between left-[calc(50%+0.5px)] top-[136px] w-[379px]" data-node-id="16:19279">
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="16:19280">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[22px] text-[color:var(--tiltle,#203c30)] w-full" data-node-id="16:19281">
            Tiêu đề câu hỏi
          </p>
          <div className="bg-[var(--card,white)] border border-black border-solid content-stretch flex items-start overflow-clip px-[12.5px] py-[14px] relative rounded-[15px] shrink-0 w-full" data-node-id="16:19282">
            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--text,#717c73)] whitespace-nowrap" data-node-id="16:19283">
              Rau củ nên bảo quản thế nào?
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-node-id="16:19284">
          <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[22px] text-[color:var(--tiltle,#203c30)] w-full" data-node-id="16:19285">
            Nội dung
          </p>
          <div className="bg-[var(--card,white)] border border-black border-solid content-stretch flex items-center justify-center overflow-clip px-[7px] py-[20px] relative rounded-[15px] shrink-0 w-full" data-node-id="16:19286">
            <div className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(0,0,0,0.5)] w-[350px]" data-node-id="16:19287">
              <p className="leading-[normal] mb-0">Mình mua hơi nhiều rau củ cho tuần này.</p>
              <p className="leading-[normal]">Mọi người thường sắp xếp và bảo quản ra sao để dễ dùng hơn?</p>
            </div>
          </div>
        </div>
        <div className="h-[234px] relative shrink-0 w-full" data-node-id="16:19288">
          <div className="-translate-x-1/2 absolute contents left-1/2 top-[37px]" data-node-id="16:19289">
            <div className="absolute border border-[rgba(255,255,255,0.67)] border-solid h-[176px] left-[18px] rounded-[20px] top-[37px] w-[343px]" data-node-id="16:19290">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle33} />
            </div>
            <div className="-translate-x-1/2 absolute bottom-[34.31%] left-[calc(50%+7.56px)] top-[41.14%] w-[66.67px]" data-node-id="16:19291" data-name="Vector">
              <img alt="" className="absolute block inset-0 max-w-none size-full" height="57.451" src={imgVector} width="66.67" />
            </div>
          </div>
          <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-0 not-italic text-[22px] text-[color:var(--tiltle,#203c30)] top-0 whitespace-nowrap" data-node-id="16:19292">
            Hình ảnh (không bắt buộc)
          </p>
        </div>
        <a className="bg-[var(--btn-select\,-icon,#245e45)] block cursor-pointer h-[53px] overflow-clip relative rounded-[10px] shrink-0 w-full" data-node-id="16:19293">
          <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[calc(50%-0.5px)] not-italic text-[20px] text-[color:var(--card,white)] text-center top-[27px] whitespace-nowrap" data-node-id="16:19294">
            <p className="leading-[normal]">Đăng bài</p>
          </div>
        </a>
      </div>
      <div className="absolute contents left-0 top-[41px]" data-node-id="16:19295">
        <div className="absolute bg-[var(--btn,#eaf1e6)] h-[61px] left-0 top-[41px] w-[428px]" data-node-id="16:19296" />
        <button className="absolute block cursor-pointer left-[15px] size-[24px] top-[57px]" data-node-id="16:19297" data-name="famicons:chevron-back-sharp">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFamiconsChevronBackSharp} />
        </button>
        <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold h-[36.365px] justify-center leading-[0] left-[84px] not-italic text-[26px] text-[color:var(--btn-select\,-icon,#245e45)] top-[70.91px] w-[235px]" data-node-id="16:19299">
          <p className="leading-[normal]">Tạo bài hỏi đáp</p>
        </div>
      </div>
    </div>
  );
}
