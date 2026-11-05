const imgRectangle61 = "https://www.figma.com/api/mcp/asset/15173d38-45c1-4978-9db3-34b3f001b8b4.png";
const imgEllipse8 = "https://www.figma.com/api/mcp/asset/dd5c0eed-55ab-4918-a8b6-6da4802fc3f4.svg";
const imgBottomWaves = "https://www.figma.com/api/mcp/asset/b3881d76-5f2f-46c0-b6a4-b369b8519eb1.svg";
const imgTopOrganic1 = "https://www.figma.com/api/mcp/asset/6e06d8bf-45ed-4331-acb5-01c89ec790b9.svg";
const imgTopOrganic2 = "https://www.figma.com/api/mcp/asset/7809dbd2-9766-4762-9936-931d97d2d4ff.svg";
const imgLeafOutline = "https://www.figma.com/api/mcp/asset/d0c692ba-791f-4479-9eee-157101f81fa4.svg";
const imgTopCurve = "https://www.figma.com/api/mcp/asset/012837d3-15e8-4945-bcdc-d6f05a2c7167.svg";

export default function Hiu1() {
  return (
    <div className="bg-gradient-to-b from-[#7bbf9e] from-[14.904%] relative size-full to-[#203c30] via-[#257955] via-[55.769%]" data-node-id="16:13885" data-name="Hiếu 1">
      <a className="-translate-x-1/2 absolute content-stretch cursor-pointer flex flex-col gap-[6px] items-center left-1/2 top-[315px] w-[364px]" data-node-id="16:13886">
        <div className="h-[107px] relative shrink-0 w-[120px]" data-node-id="16:13887">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle61} />
        </div>
        <p className="[word-break:break-word] font-['Inter:Extra_Bold'] font-extrabold leading-[normal] min-w-full not-italic relative shrink-0 text-[50px] text-[color:var(--card,white)] text-center w-[min-content]" data-node-id="16:13888">
          MorselUp
        </p>
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="16:13889">
          <div className="col-1 h-[24px] ml-0 mt-0 relative row-1 w-[346px]" data-node-id="16:13890">
            <p className="[word-break:break-word] absolute font-['Inter:Bold'] font-bold leading-[normal] left-[calc(50%-170px)] not-italic text-[18px] text-[color:var(--btn,#eaf1e6)] text-left top-0 w-[340px] whitespace-pre-wrap" data-node-id="16:13891">{`Chia sẻ thực phẩm    Kết nối cộng đồng`}</p>
            <div className="-translate-x-1/2 absolute left-[calc(50%+2px)] size-[4px] top-[12px]" data-node-id="16:13892">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse8} />
            </div>
          </div>
        </div>
      </a>
      <div className="absolute h-[220px] left-0 top-[706px] w-[428px]" data-node-id="16:13893" data-name="bottom waves">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBottomWaves} />
      </div>
      <div className="absolute flex h-[374.452px] items-center justify-center left-[-224px] top-[-174px] w-[419.395px]" data-node-id="16:13897">
        <div className="flex-none rotate-18">
          <div className="h-[280px] relative w-[350px]" data-name="top organic 1">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTopOrganic1} />
          </div>
        </div>
      </div>
      <div className="absolute flex h-[192.561px] items-center justify-center left-[-141px] top-[70px] w-[250.418px]" data-node-id="16:13898">
        <div className="flex-none rotate-[26.66deg]">
          <div className="h-[100px] relative w-[230px]" data-name="top organic 2">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTopOrganic2} />
          </div>
        </div>
      </div>
      <div className="absolute h-[150px] left-[310px] top-[631px] w-[105px]" data-node-id="16:13899" data-name="leaf outline">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLeafOutline} />
      </div>
      <div className="absolute h-[250px] left-[-35px] top-0 w-[230px]" data-node-id="16:13901" data-name="top curve">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTopCurve} />
      </div>
    </div>
  );
}
