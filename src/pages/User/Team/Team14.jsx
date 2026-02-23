import React from "react";
import TeamSection from "./TeamSection";
import images from "../../../utils/images";

export default function Team14() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <TeamSection title="대표/부대표" members={leader} />
                <TeamSection title="기획/디자인팀" members={design} />
            </div>

            <div className="w-full">
                <TeamSection title="프론트엔드팀" members={frontend} />
            </div>

            <div className="w-full">
                <TeamSection title="백엔드팀" members={backend} />
            </div>
        </div>
    );
}

const leader = [
    {
        name: "조승민",
        role: "대표",
        department: "미디어소프트웨어학과 21",
        img: `${images.조승민}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginRight: "-8px",
        imgMarginTop: "-15px",
    },
    {
        name: "홍민경",
        role: "부대표",
        department: "컴퓨터공학과 23",
        img: `${images.홍민경}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginRight: "-8px",
        imgMarginTop: "-15px",
    },
];

const design = [
    {
        name: "노태경",
        role: "파트장",
        department: "미디어소프트웨어학과 21",
        img: `${images.노태경}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginTop: "-10px",
    },
    {
        name: "김지유",
        role: "운영진",
        department: "컴퓨터공학과 24",
        img: `${images.김지유}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginTop: "-3px",
    },
];

const frontend = [
    {
        name: "구혜원",
        role: "파트장",
        department: "미디어소프트웨어학과 22",
        img: `${images.구혜원}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginTop: "-15px",
    },
    {
        name: "김민규",
        role: "운영진",
        department: "컴퓨터공학과 23",
        img: `${images.김민규}`,
        imgWidth: "130px",
        imgHeight: "130px",
    },
    {
        name: "김소은",
        role: "운영진",
        department: "컴퓨터공학과 24",
        img: `${images.김소은}`,
        imgWidth: "130px",
        imgHeight: "130px",
    },
];

const backend = [
    {
        name: "권오현",
        role: "파트장",
        department: "컴퓨터공학과 23",
        img: `${images.권오현}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginRight: "-15px",
    },
    {
        name: "윤준하",
        role: "운영진",
        department: "미디어소프트웨어학과 21",
        img: `${images.윤준하}`,
        imgWidth: "130px",
        imgHeight: "130px",
    },
    {
        name: "조준형",
        role: "운영진",
        department: "컴퓨터공학과 23",
        img: `${images.조준형}`,
        imgWidth: "130px",
        imgHeight: "130px",
        imgMarginRight: "10px",
    },
];
