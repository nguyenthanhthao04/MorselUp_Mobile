const imgVector = "https://www.figma.com/api/mcp/asset/38bc445e-e5af-4f27-8486-e12684771f43.svg";
const imgEllipse70 = "https://www.figma.com/api/mcp/asset/c666d073-b6c6-4385-b035-110ba4256eaa.svg";
const imgEllipse71 = "https://www.figma.com/api/mcp/asset/60d7bf4d-e6d3-47d1-8aad-a6b48cd44eff.svg";
const imgChevronLeft = "https://www.figma.com/api/mcp/asset/d16592d8-5009-4e5a-bd25-a8312d11fe32.svg";

export default function Lun10NgonNg() {
  return (
    <div className="bg-[#faf9f3] relative size-full" data-node-id="16:19503" data-name="Luận 10.Ngôn ngữ">
      <div className="absolute inset-[35.1%_8.41%_64.9%_45.33%]" data-node-id="16:19504" data-name="Vector">
        <div className="absolute inset-[-7.5px_-3.79%]">
          <img alt="" className="block max-w-none size-full" src={imgVector} />
        </div>
      </div>
      <div className="absolute h-[68px] left-[24px] top-[135px] w-[248px]" data-node-id="16:19505" />
      <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[20px] items-start left-1/2 top-[135px] w-[360px]" data-node-id="16:19506">
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] not-italic relative shrink-0 text-[color:var(--tiltle,#203c30)] w-[248px]" data-node-id="16:19507">
          <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[25px] w-full" data-node-id="16:19508">
            Ngôn ngữ ứng dụng
          </p>
          <p className="font-['Inter:Light'] font-light relative shrink-0 text-[18px] w-full" data-node-id="16:19509">
            Thay đổi ngôn ngữ hiển thị
          </p>
        </div>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="16:19510">
          <div className="bg-[#eaf1e6] border border-[#245e45] border-solid col-1 content-stretch flex flex-col items-start ml-0 mt-0 overflow-clip px-[21px] py-[18px] relative rounded-[10px] row-1 w-[347px]" data-node-id="16:19511">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="16:19512">
              <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[color:var(--text,#717c73)] text-center whitespace-nowrap" data-node-id="16:19513">
                <p className="leading-[normal]">Tiếng Việt</p>
              </div>
              <div className="relative shrink-0 size-[20px]" data-node-id="16:19514">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse70} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-[var(--tiltle,#203c30)] border-solid content-stretch flex flex-col items-center justify-center overflow-clip px-[25px] py-[18px] relative rounded-[10px] shrink-0 w-[347px]" data-node-id="16:19515">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-[303px]" data-node-id="16:19516">
            <div className="[word-break:break-word] flex flex-col font-['Inter:Regular'] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-[color:var(--text,#717c73)] text-center whitespace-nowrap" data-node-id="16:19517">
              <p className="leading-[normal]">English</p>
            </div>
            <div className="relative shrink-0 size-[20px]" data-node-id="16:19518">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse71} />
            </div>
          </div>
        </div>
      </div>
      <a className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#245e45] block cursor-pointer h-[53px] left-[calc(50%+1.5px)] overflow-clip rounded-[10px] top-[calc(50%+375.5px)] w-[399px]" data-node-id="16:19519">
        <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['Inter:Bold'] font-bold justify-center leading-[0] left-[200px] not-italic text-[20px] text-center text-white top-[26px] whitespace-nowrap" data-node-id="16:19520">
          <p className="leading-[normal]">Lưu thay đổi</p>
        </div>
      </a>
      <div className="-translate-x-1/2 absolute bg-[#eaf1e6] h-[61px] left-1/2 top-[45px] w-[428px]" data-node-id="16:19521">
        <div className="absolute bg-[#eaf1e6] h-[61px] left-0 top-0 w-[428px]" data-node-id="16:19522" />
        <div className="absolute content-stretch flex h-[34px] items-center justify-between left-[40px] top-[10px] w-[122px]" data-node-id="16:19523">
          <div className="h-[20px] relative shrink-0 w-[122px]" data-node-id="16:19524">
            <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold h-[19px] leading-[normal] left-[2px] not-italic text-[24px] text-[color:var(--btn-select\,-icon,#245e45)] top-0 w-[162px]" data-node-id="16:19525">
              Ngôn ngữ
            </p>
          </div>
        </div>
        <button className="absolute block cursor-pointer left-[11px] size-[24px] top-[17px]" data-node-id="16:19526" data-name="chevron-left">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgChevronLeft} />
        </button>
      </div>
    </div>
  );
}
