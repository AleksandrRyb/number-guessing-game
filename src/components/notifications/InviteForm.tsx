//@ts-nocheck
import React from "react";
import { Popover, Block, BlockTitle, Input, Button } from "framework7-react";

function InviteForm({
  openInvitePopover,
  setOpenInvitePopover,
  handleInviteChange,
  inviteForm,
  handleInviteSubmit,
  isSendingInvite,
}) {
  return (
    <Popover
      closeByOutsideClick={false}
      closeByBackdropClick={false}
      opened={openInvitePopover}
    >
      <Block>
        <BlockTitle medium className="text-align-center">
          Send Email
        </BlockTitle>
        <Input
          onChange={handleInviteChange}
          name="email"
          value={inviteForm.email}
          style={{ padding: "7px 0 7px 0px" }}
          className="margin-bottom"
          placeholder="Email"
          outline
          type="email"
        />
        <Input
          onChange={handleInviteChange}
          name="message"
          value={inviteForm.message}
          style={{ padding: "7px 0 7px 0px" }}
          className="margin-bottom"
          placeholder="Message"
          outline
          type="text"
        />
        <div className="display-flex justify-content-space-around align-items-center">
          <Button
            onClick={() => setOpenInvitePopover(false)}
            colorTheme="blue"
            fillMd
            text="Cancel"
          />
          <Button
            onClick={handleInviteSubmit}
            disabled={isSendingInvite}
            loading={isSendingInvite}
            colorTheme="green"
            fillMd
            text="Send Invite"
          />
        </div>
      </Block>
    </Popover>
  );
}

export default InviteForm;
