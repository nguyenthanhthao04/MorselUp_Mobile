const imgGroup = "https://www.figma.com/api/mcp/asset/16322749-fe84-4a2b-9eb3-ef95c0049893.svg";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/fa6b464e-b82c-4ee6-b318-7b0eddc1e854.svg";

export default function QuanFrame316() {
  return (
    <div className="bg-[var(--background,#faf9f3)] cursor-pointer overflow-clip relative rounded-[15px] size-full" data-node-id="16:21284" data-name="Quân. Frame 316">
      <a className="absolute border-[var(--underline,#dce3d8)] border-b border-solid content-stretch flex gap-[5px] h-[55px] items-center justify-center left-0 overflow-clip px-[50px] py-[16px] top-0 w-[354px]" data-node-id="16:21285">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="16:21286" data-name="bi:card-list">
          <div className="absolute inset-[12.5%_0]" data-node-id="16:21287" data-name="Group">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--btn-select\,-icon,#245e45)] text-left whitespace-nowrap" data-node-id="16:21290">
          Danh sách yêu cầu gửi tới
        </p>
      </a>
      <a className="absolute content-stretch flex gap-[5px] h-[55px] items-center justify-center left-0 overflow-clip px-[50px] py-[16px] top-[55px] w-[354px]" data-node-id="16:21291">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="16:21292" data-name="healthicons:i-schedule-school-date-time-outline">
          <div className="absolute inset-[4.17%_4.17%_8.33%_8.33%]" data-node-id="16:21293" data-name="Group">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[15px] text-[color:var(--btn-select\,-icon,#245e45)] text-left whitespace-nowrap" data-node-id="16:21298">
          Danh sách lịch hẹn
        </p>
      </a>
    </div>
  );
}
