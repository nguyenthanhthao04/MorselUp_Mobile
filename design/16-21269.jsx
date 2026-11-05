const imgGroup = "https://www.figma.com/api/mcp/asset/34e4831d-d220-4642-a8fe-0b9ef227ad7f.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/4ffe44f1-e5d8-4106-9d4d-7bec0b94a73f.svg";

export default function QuanDj() {
  return (
    <div className="bg-[var(--background,#faf9f3)] cursor-pointer overflow-clip relative rounded-[15px] size-full" data-node-id="16:21269" data-name="Quân. dj">
      <a className="absolute border-[var(--underline,#dce3d8)] border-b border-solid content-stretch flex gap-[5px] h-[55px] items-center justify-center left-0 overflow-clip px-[50px] py-[16px] top-0 w-[354px]" data-node-id="16:21270">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="16:21271" data-name="bi:card-list">
          <div className="absolute inset-[12.5%_0]" data-node-id="16:21272" data-name="Group">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[15px] text-left whitespace-nowrap" data-node-id="16:21275">
          Danh sách yêu cầu gửi tới
        </p>
      </a>
      <a className="absolute content-stretch flex gap-[5px] h-[55px] items-center justify-center left-0 overflow-clip px-[50px] py-[16px] top-[55px] w-[354px]" data-node-id="16:21276">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="16:21277" data-name="healthicons:i-schedule-school-date-time-outline">
          <div className="absolute inset-[4.17%_4.17%_8.33%_8.33%]" data-node-id="16:21278" data-name="Group">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#245e45] text-[15px] text-left whitespace-nowrap" data-node-id="16:21283">
          Danh sách lịch hẹn
        </p>
      </a>
    </div>
  );
}
