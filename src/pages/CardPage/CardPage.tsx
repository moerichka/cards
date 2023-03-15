/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "context/userContext";

import ChapterTab from "components/ChapterTab";
import { ButtonLink, ButtonRoute } from "components/Button";

import { chapters } from "data/chapters";

import logoImage from "images/logoBlue.png";

import s from "./CardPage.module.scss";

function CardPage() {
  const { cardId } = useParams();
  const { userEmail } = useContext(UserContext);

  const thisChapter = useMemo(
    () => chapters.find((elem) => elem.id === Number(cardId)),
    [cardId],
  );

  // useEffect(() => {
  //   if (!thisChapter) {
  //     router.push("/cards");
  //   }

  //   if (thisChapter?.status !== "available") {
  //     router.push("/cards");
  //   }

  //   if (!userEmail) {
  //     router.push("/");
  //   }
  // }, [router, thisChapter, userEmail]);

  // if (!thisChapter) {
  //   return null;
  // }

  return (
    <div className={s.cardPage}>
      <div className={s.grid}>
        <div className={s.header}>
          <div className={s.logoWrapper}>
            <img
              src={logoImage}
              alt="Logo"
              style={{ objectFit: "contain" }}
              className="fill"
            />
            <Link to="/cards" className="linkFill" />
          </div>
          <Link to="/cards" className={s.closeButton}>
            <span className={s.line} />
            <span className={s.line} />
          </Link>
        </div>
        <div className={`${s.titlePart} ${s.desktop}`}>
          <div className={s.chapterNumber}>
            Chapter {thisChapter?.chapterNumber}
          </div>
          <div className={s.title}>{thisChapter?.title}</div>
        </div>
        <div className={s.chapter}>
          <div className={s.chapterBanner}>
            <div className={s.imageWrapper}>
              <img
                src={thisChapter?.image}
                style={{ objectFit: "cover" }}
                className="fill"
                alt=""
              />
            </div>
            <div className={s.dateWrapper}>
              <div className={s.date}>{thisChapter?.date}</div>
            </div>
          </div>
          <div className={s.buttons}>
            <ButtonRoute
              to="/cards"
              className={`${s.button} ${s.noMobile}`}
              variant="blue"
            >
              Back
            </ButtonRoute>
            <ButtonLink href="/" className={s.button}>
              Join
            </ButtonLink>
          </div>
          <div className={`${s.titlePart} ${s.tablet}`}>
            <div className={s.topPart}>
              <div className={s.chapterNumber}>
                Chapter {thisChapter?.chapterNumber}
              </div>
              <div className={s.date}>{thisChapter?.date}</div>
            </div>
            <div className={s.title}>{thisChapter?.title}</div>
          </div>
          <div className={s.chapterText}>{thisChapter?.text}</div>
        </div>
        <div className={s.tabs}>
          {chapters.map((chapter) => (
            <div className={s.tabWrapper} key={chapter.id}>
              <ChapterTab chapter={chapter} />
              {chapter.status === "available" && (
                <Link
                  to={`/cards/${chapter.id}`}
                  className="linkFill"
                  style={{ zIndex: 5 }}
                />
              )}
            </div>
          ))}
        </div>
        <div className={s.footer}>
          <div className={s.buttons}>
            <ButtonRoute to="/cards" className={s.button} variant="blue">
              Back
            </ButtonRoute>
            {cardId !== "0" && (
              <ButtonLink href="/" className={s.button}>
                Join
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPage;
