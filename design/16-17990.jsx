const imgRectangle115 = "https://www.figma.com/api/mcp/asset/c3421eb4-0e56-4f42-ac3a-987887221ee3.png";
const imgZap = "https://www.figma.com/api/mcp/asset/bac4e0f4-58e2-449a-8c7a-e83adc6e195b.svg";
const imgFrame98 = "https://www.figma.com/api/mcp/asset/70370b8a-e185-4910-9e13-24d54941bd64.svg";
const imgFrame101 = "https://www.figma.com/api/mcp/asset/6c8be80b-2207-45b3-8f3c-ca368891baa5.svg";

export default function Quan7() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:17990" data-name="Quân 7.">
      <div className="absolute h-[490px] left-[20px] rounded-[20px] top-[155px] w-[388px]" data-node-id="16:17991">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle115} />
      </div>
      <div className="absolute h-[35px] left-[25px] top-[86px] w-[24px]" data-node-id="16:17992" data-name="zap">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgZap} />
      </div>
      <div className="absolute content-stretch flex h-[166px] items-center justify-between left-[25px] top-[645px] w-[378px]" data-node-id="16:17994">
        <button className="[word-break:break-word] block cursor-pointer font-['Inter:Medium'] font-medium leading-[0] not-italic relative shrink-0 text-[#203c30] text-[16px] text-left whitespace-nowrap" data-node-id="16:17995">
          <p className="leading-[normal]">Cancel</p>
        </button>
        <a className="block cursor-pointer relative shrink-0 size-[90px]" data-node-id="16:17996">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame98} />
        </a>
        <div className="relative shrink-0 size-[40px]" data-node-id="16:17998">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame101} />
        </div>
      </div>
    </div>
  );
}
