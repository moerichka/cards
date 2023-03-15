import React, { useContext, useMemo, useState } from "react";
import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { UserContext } from "context/userContext";

import s from "./ButtonToInput.module.scss";

const regexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MAILCHIMP_URL = process.env.REACT_APP_MAICHIMP_URL || "";

function ButtonToInput() {
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const fieldClassName = useMemo(
    () => `${s.field} ${isOpen ? s.active : ""}`,
    [isOpen],
  );
  const buttonTextClassNameClose = useMemo(
    () => `${s.buttonText} ${isOpen ? "" : s.active}`,
    [isOpen],
  );
  const buttonTextClassNameOpen = useMemo(
    () => `${s.buttonText} ${isOpen ? s.active : ""}`,
    [isOpen],
  );

  const onExploreClick = () => {
    setIsOpen(true);
  };

  const onGoClick = (subscribe: (data: EmailFormFields) => void) => {
    if (!email.match(regexp)) {
      enqueueSnackbar({
        variant: "trace",
        customTitle: "Error",
        customMessage: "Email is not valid",
        type: "error",
      });
      return;
    }
    setUserEmail(email);
    localStorage.setItem("userEmail", email);
    navigate("/cards");
    // subscribe({ EMAIL: email });
    enqueueSnackbar({
      variant: "trace",
      customTitle: "Successfully",
      customMessage: "Email has been sended",
    });
  };

  const onBlur = () => {
    setIsOpen(false);
  };

  const onSubmit =
    (subscribe: (data: EmailFormFields) => void) =>
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (isOpen) {
        onGoClick(subscribe);
        return;
      }
      onExploreClick();
    };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe }) => {
        return (
          <form className={fieldClassName} onSubmit={onSubmit(subscribe)}>
            <input
              type="text"
              className={s.input}
              value={email}
              onChange={onEmailChange}
              placeholder="Enter email to explore"
            />
            <button type="submit" className={s.button}>
              <span className={buttonTextClassNameClose}>Explore</span>
              <span className={buttonTextClassNameOpen}>Go</span>
            </button>
          </form>
        );
      }}
    />
  );
}

export default ButtonToInput;
