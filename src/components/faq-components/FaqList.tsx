import { FaqItem } from "@/types/faq-types";
import { FaqItemComponent } from "./FaqItem";

interface FaqListProps {
  faqData: FaqItem[];
  openItems: Set<number>;
  onToggleItem: (faqId: number) => void;
}

export const FaqList = ({ faqData, openItems, onToggleItem }: FaqListProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
      {faqData.map((item, index) => (
        <FaqItemComponent
          key={item.faqId}
          item={item}
          index={index}
          isOpen={openItems.has(item.faqId)}
          onToggle={onToggleItem}
        />
      ))}
    </div>
  );
};
