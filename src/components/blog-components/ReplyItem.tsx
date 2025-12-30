// app/blog/[id]/components/ReplyItem.tsx
import React from "react";
import CommentItem from "./CommentItem";
import { BlogCommentReply } from "@/types/blog-types";

interface ReplyItemProps {
  reply: BlogCommentReply;
  depth: number;
  replyTexts: Record<number, string>;
  showReplyInput: number | null;
  onReplyTextChange: (commentId: number, text: string) => void;
  onSubmitReply: (commentId: number) => void;
    onCommentReact: (commentId: number, reactType: string) => void;
  setShowReplyInput: (id: number | null) => void;
  formatDate: (dateString: string) => string;
}

const ReplyItem: React.FC<ReplyItemProps> = (props) => {
  return <CommentItem {...props} comment={props.reply} depth={props.depth} />;
};

export default ReplyItem;