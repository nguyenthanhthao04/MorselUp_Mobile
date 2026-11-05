const imgRectangle115 = "https://www.figma.com/api/mcp/asset/9c4c3bcd-c856-424d-953b-8b5dbde24856.png";
const imgZap = "https://www.figma.com/api/mcp/asset/20e67d9c-f541-4761-a739-1c5579f6a9a5.svg";
const imgFrame98 = "https://www.figma.com/api/mcp/asset/568a899b-482a-4407-a148-e321f9e8fde8.svg";
const imgFrame101 = "https://www.figma.com/api/mcp/asset/d77e7e85-c1bd-47b6-b236-157b1ea46204.svg";

export default function Quan7A() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:17976" data-name="Quân 7.A">
      <div className="absolute h-[490px] left-[20px] rounded-[20px] top-[155px] w-[388px]" data-node-id="16:17977">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle115} />
      </div>
      <div className="absolute h-[35px] left-[25px] top-[86px] w-[24px]" data-node-id="16:17978" data-name="zap">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgZap} />
      </div>
      <div className="absolute content-stretch flex h-[166px] items-center justify-between left-[25px] top-[645px] w-[378px]" data-node-id="16:17980">
        <button className="[word-break:break-word] block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] not-italic relative shrink-0 text-[#203c30] text-[16px] text-left whitespace-nowrap" data-node-id="16:17981">
          <p className="leading-[normal]">Cancel</p>
        </button>
        <a className="block cursor-pointer relative shrink-0 size-[90px]" data-node-id="16:17982">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame98} />
        </a>
        <div className="relative shrink-0 size-[40px]" data-node-id="16:17984">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame101} />
        </div>
      </div>
    </div>
  );
}
