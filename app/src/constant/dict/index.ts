import type { IDict } from "@/typings";

const dicts: IDict[] = [
  {
    key: "question_type",
    items: [
      { label: "单选题", value: "1" },
      { label: "多选题", value: "2" },
      { label: "判断题", value: "3" },
      { label: "填空题", value: "4" },
    ],
  },
];

export default dicts;
