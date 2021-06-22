import React from "react";
import {
  Popover,
  Block,
  BlockHeader,
  BlockFooter,
  BlockTitle,
  Input,
  Button,
} from "framework7-react";

import { setDefaultInviteSending } from "../../redux/action-creators/invite.action-creators";
import { useActions } from "../../hooks/use-action.hooks";

import { IInviteForm } from "../../types/game.types";

function InviteForm({
  inviteSendSuccess,
  inviteSendFailure,
  openInvitePopover,
  setOpenInvitePopover,
  handleInviteChange,
  inviteForm,
  handleInviteSubmit,
  isSendingInvite,
}: IInviteForm) {
  const dispatch = useActions();
  const notificationsColor = inviteSendSuccess ? "green" : "red";

  React.useEffect(() => {
    if (inviteSendSuccess) {
      setTimeout(() => {
        setOpenInvitePopover(false);
        dispatch(setDefaultInviteSending());
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteSendSuccess]);

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
        <BlockHeader textColor="red">
          *User must be authorized in app to receive invite, otherwise it will
          not working!*
        </BlockHeader>
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
        <BlockFooter
          className="margin-bottom text-align-center"
          style={{ minHeight: "20px" }}
          textColor={notificationsColor}
        >
          {inviteSendSuccess || inviteSendFailure || null}
        </BlockFooter>
        <div className="display-flex justify-content-space-around align-items-center">
          <Button
            onClick={() => {
              setOpenInvitePopover(false);
              dispatch(setDefaultInviteSending());
            }}
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
