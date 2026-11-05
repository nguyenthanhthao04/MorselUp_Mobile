const imgRectangle115 = "https://www.figma.com/api/mcp/asset/4bd31640-a354-4cdf-873a-b9e6ff1da5f1.png";

export default function QuanTr() {
  return (
    <div className="bg-[var(--background,#faf9f3)] relative size-full" data-node-id="16:18374" data-name="Quân tr">
      <div className="absolute h-[490px] left-[20px] rounded-[20px] top-[155px] w-[388px]" data-node-id="16:18375">
        <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[20px]">
          <div className="absolute bg-[#d9d9d9] inset-0 rounded-[20px]" />
          <img alt="" className="absolute max-w-none object-cover rounded-[20px] size-full" src={imgRectangle115} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bottom-[115px] content-stretch flex h-[166px] items-center justify-between left-1/2 w-[388px]" data-node-id="16:18376">
        <div className="bg-white border border-[#dce3d8] border-solid content-stretch flex h-[56px] items-center justify-center px-[40px] py-[18px] relative rounded-[16px] shrink-0" data-node-id="16:18377">
          <button className="[word-break:break-word] block cursor-pointer font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#245e45] text-[16px] text-center whitespace-nowrap" data-node-id="16:18378">
            <p className="leading-[normal]">Chụp lại</p>
          </button>
        </div>
        <a className="bg-[#245e45] border border-[#dce3d8] border-solid content-stretch cursor-pointer flex items-center justify-center px-[40px] py-[18px] relative rounded-[16px] shrink-0" data-node-id="16:18379">
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap" data-node-id="16:18380">
            Sử dụng ảnh
          </p>
        </a>
      </div>
    </div>
  );
}
