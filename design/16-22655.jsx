const imgMap = "https://www.figma.com/api/mcp/asset/7abc971b-7a2e-4173-9c8a-204cea6ab221.svg";
const imgIOsPermissionLocationIcon = "https://www.figma.com/api/mcp/asset/6599f17e-36de-4e13-a51a-ecfce7462610.svg";

export default function HiuQuynTruyCpVTri() {
  return (
    <div className="relative size-full" data-node-id="16:22655" data-name="Hiếu. quyền truy cập vị trí">
      <CodeConnectSnippet data-node-id="16:22656" data-name="loacation">
        {/* iOS and iPadOS 26 component
Docs:
  https://developer.apple.com/design/human-interface-guidelines/alerts */}
        <Alert booleanShowField2={true} showField2={true} booleanShowFields={true} showFields={true} variantType="Stacked" type="Stacked">
          <BG variantMode="Light" mode="Light" />
          <TextFieldBackground variantMode="Light" mode="Light" />
          <TextField textValue="Value" value="Value" variantState="Value Entered" state="Value Entered">
            <Separator variantMode="Light" mode="Light" />
          </TextField>
          <TextField textValue="Value" value="Value" variantState="Placeholder" state="Placeholder">
            <Separator variantMode="Light" mode="Light" />
          </TextField>
          <Button1 textText="Cho phép một lần" text="Cho phép một lần" variantMode="Light" mode="Light" variantType="Primary" type="Primary" />
          <Button2 textText="Cho phép khi dùng ứng dụng" text="Cho phép khi dùng ứng dụng" variantMode="Light" mode="Light" variantType="Primary" type="Primary" />
          <Button3 textText="Từ chối" text="Từ chối" variantMode="Light" mode="Light" variantType="Secondary" type="Secondary" />
        </Alert>
      </CodeConnectSnippet>
      <div className="[word-break:break-word] absolute bg-[#f6f6f6] h-[108px] leading-[0] left-[14px] not-italic overflow-clip rounded-[20px] text-center top-[14px] w-[272px] whitespace-pre-wrap" data-node-id="16:22657" data-name="header">
        <div className="-translate-x-1/2 absolute font-['Inter:Semi_Bold'] font-semibold left-[136px] text-[17px] text-[color:var(--tiltle,#203c30)] top-[8px] w-[248px]" data-node-id="16:22658">
          <p className="leading-[22px] mb-0">{`Cho phép “MorselUp” `}</p>
          <p className="leading-[22px]">dùng vị trí?</p>
        </div>
        <div className="-translate-x-1/2 absolute font-['Inter:Regular'] font-normal h-[34px] left-[136px] text-[13px] text-[color:var(--text,#717c73)] top-[60px] w-[244px]" data-node-id="16:22659">
          <p className="leading-[17px] mb-0">{`Để gợi ý đồ ăn gần bạn và `}</p>
          <p className="leading-[17px]">tính khoảng cách đến điểm lấy.</p>
        </div>
      </div>
      <div className="absolute bg-[#d1e0ed] h-[123px] left-[14px] overflow-clip rounded-[14px] top-[132px] w-[272px]" data-node-id="16:22660" data-name="pr">
        <div className="absolute h-[123px] left-0 top-0 w-[272px]" data-node-id="16:22661" data-name="map">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMap} />
        </div>
        <div className="absolute bg-[var(--text,#717c73)] content-stretch flex h-[30px] items-center justify-center left-[10px] overflow-clip px-[9px] py-[5px] rounded-[15px] top-[9px] w-[132px]" data-node-id="16:22671" data-name="con">
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-node-id="16:22672">
            <div className="relative shrink-0 size-[18px]" data-node-id="16:22673" data-name="iOS / Permission / Location Icon">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIOsPermissionLocationIcon} />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[12px] text-[color:var(--card,white)] whitespace-nowrap" data-node-id="16:22675">
              Chính xác: Bật
            </p>
          </div>
        </div>
      </div>
      <a className="absolute bg-[rgba(255,255,255,0.01)] block cursor-pointer h-[49px] left-[14px] top-[265px] w-[272px]" data-node-id="16:22676" data-name="Cho phép một lần · Hit area" />
      <a className="absolute bg-[rgba(255,255,255,0.01)] block cursor-pointer h-[49px] left-[14px] top-[324px] w-[272px]" data-node-id="16:22677" data-name="Cho phép khi dùng ứng dụng · Hit area" />
      <button className="absolute bg-[rgba(90,90,90,0.35)] block cursor-pointer h-[47px] left-[14px] rounded-[25px] top-[383px] w-[272px]" data-node-id="16:22678" data-name="Từ chối · Hit area" />
    </div>
  );
}
