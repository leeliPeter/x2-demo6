import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check, ArrowUpRight, MoveUpRight } from "lucide-react";

export default function FakeResponce() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div lang="zh-TW" className="space-y-2">
      <p>
        以下是一段修訂後的System
        Prompt，根據悠供的圖像，沒資計期與融資計劃部分胡整為「無』。請檢視是否符合您的需求：
        System Prompt:
        你是一個專業的財務報表生成助手，能辨津確地根據用戶提供的致字生成固定格式的財務報告。請使用以下格式和內容，並保持一字不差，僅將數宇替換為用戶提供的新數字：
        6.2.3現金流量分析台積公司及子公司財務報表 單位：新台幣仟元
      </p>
      <ol className="list-none space-y-2">
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          年初現金餘額（民國XXX年12月31日）全年來自營業活動淨現金流量（民國XXK年）全年因投資活動淨現金流量（民國
          XXX年）全年因籌資活動净現金流量（民國X0KX年）全年因匯半製動封現金及約當現金之影響（民國XCX年）現金剩餘餘瓶
          民XXX年12月31日）流動性不足之改善計劃［數字1［數字2］［數字3］［数字4］［數字5］［數字6］投資計劃：無融資計劃：無
          本年度現金流量變動分析
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          營業活動之現金流入約［數宇］億：主要係包含稅後淨利及折信、推銷發用。
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          投資活動之現金流出的［數宇］億：主要係用於資本支出。
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          需資活動之現金流入約［數宇］倦：主要係發行公司價，部分因發放現金股利而抵銷。
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          流動性不足之改善計劃及流動性分析。
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          無現金流動性不足之情形。
        </li>
        <li className="flex items-start gap-3">
          <span className="text-3xl leading-6 -mt-2 text-primary">.</span>
          未來一年現金流動性分析：不適用。
        </li>
      </ol>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2 border rounded-lg p-1 mt-1 bg-foreground text-background"
      >
        <CollapsibleTrigger asChild className="w-full">
          <div className="flex items-center justify-between space-x-4 px-2 cursor-pointer">
            <h4 className="text-sm font-semibold">
              Click to see additional information
            </h4>
            <Button size="sm" variant="default" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md  justify-between  px-4 py-3 font-mono text-sm flex  gap-2 hover:bg-background hover:text-foreground">
            <Check className="text-green-500" /> Updated variable "年初現金餘額"
            at Section 1.2
            <ArrowUpRight className="text-muted-foreground" />
          </div>
          <div className="rounded-md  px-4 py-3 font-mono text-sm flex  gap-2 hover:bg-background hover:text-foreground">
            <Check className="text-green-500" /> Updated variable
            "全年來自營業活動淨現金流量" at Section 1.3
            <ArrowUpRight className="text-muted-foreground" />
          </div>
          <div className="rounded-md  px-4 py-3 font-mono text-sm flex  gap-2 hover:bg-background hover:text-foreground">
            <Check className="text-green-500" /> Updated variable
            "全年因投資活動淨現金流量" at Section 1.4
            <ArrowUpRight className="text-muted-foreground" />
          </div>
        </CollapsibleContent>
      </Collapsible>
      <p>
        以上內容已執行完成，已為你替數字完成。如果有其他特別需求，請告訴我。
      </p>
    </div>
  );
}
