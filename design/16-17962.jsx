const imgRectangle115 = "https://www.figma.com/api/mcp/asset/7c1bea39-c988-41b6-9d34-8cd5e316fee7.png";
const imgZap = "https://www.figma.com/api/mcp/asset/987c09f8-5a40-40a0-a897-23b2ce1c208b.svg";
const imgFrame98 = "https://www.figma.com/api/mcp/asset/551aa167-d13d-402b-a557-a33c066abe16.svg";
const imgFrame101 = "https://www.figma.com/api/mcp/asset/4477bed3-1de1-421a-bfc3-8827e2a7e306.svg";

export default function Quan7() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:17962" data-name="Quân 7.">
      <div className="absolute h-[490px] left-[20px] rounded-[20px] top-[155px] w-[388px]" data-node-id="16:17963">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle115} />
      </div>
      <div className="absolute h-[35px] left-[25px] top-[86px] w-[24px]" data-node-id="16:17964" data-name="zap">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgZap} />
      </div>
      <div className="absolute content-stretch flex h-[166px] items-center justify-between left-[25px] top-[645px] w-[378px]" data-node-id="16:17966">
        <button className="[word-break:break-word] block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] not-italic relative shrink-0 text-[#203c30] text-[16px] text-left whitespace-nowrap" data-node-id="16:17967">
          <p className="leading-[normal]">Cancel</p>
        </button>
        <a className="block cursor-pointer relative shrink-0 size-[90px]" data-node-id="16:17968">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame98} />
        </a>
        <div className="relative shrink-0 size-[40px]" data-node-id="16:17970">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame101} />
        </div>
      </div>
    </div>
  );
}
