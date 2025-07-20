import React from "react";
import { GiGraduateCap } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import { PiLightbulb } from "react-icons/pi";
import { VscVscodeInsiders } from "react-icons/vsc";

const chatData = [
  {
    title: "Criar imagens",
    icon: <PiLightbulb />,
    iconColor: "#e2c541",
  },
  {
    title: "Aconselhamento",
    icon: <MdEditNote />,
    iconColor: "#e285c7",
  },
  {
    title: "Resumir texto",
    icon: <GiGraduateCap />,
    iconColor: "#e86060",
  },
  {
    title: "Código",
    icon: <VscVscodeInsiders />,
    iconColor: "#76d0eb",
  },
  {
    title: "Mais",
  },
];

type sideBarProps = {
  sideBar?: boolean;
};

const ChatHelp = ({ sideBar }: sideBarProps) => {
  return (
    <div
      className={`w-full flex flex-col ${
        sideBar ? "md:flex-col" : "md:flex-row"
      } lg:items-center lg:flex-row justify-center gap-3 max-w-70 mx-auto md:max-w-full transition`}
    >
      {chatData.map((item, index) => (
        <div
          key={index}
          className="border border-gray-600 rounded-full flex items-center justify-center gap-3 py-1 px-2 hover:bg-white/10 hover:border-white/50 transition hover:scale-95 cursor-pointer"
        >
          {item?.icon && (
            <span className="text-xl" style={{ color: item.iconColor }}>
              {item.icon}
            </span>
          )}
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHelp;
