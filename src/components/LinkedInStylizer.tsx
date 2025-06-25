"use client";

import { useState, useRef } from "react";
import { Bold, Italic, Copy, Check, Smile, MoreHorizontal, X, Globe, ThumbsUp, MessageSquare, Repeat, Send } from "lucide-react";
import { toBold, toItalic, toBoldItalic } from "@/lib/unicode-styles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function LinkedInStylizer() {
  const [text, setText] = useState(
    "The DNA of a great company culture is built on these key strands:\n\n- Trust & Transparency\n- Empowerment & Autonomy\n- Continuous Learning & Growth\n\nWhat's in your company's DNA?"
  );
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const popularEmojis = ["✨", "🚀", "👍", "💡", "🎯", "🤝", "💼", "📈", "✅", "👇", "🔥", "🙌"];

  const applyTransform = (transformFn: (str: string) => string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (selectedText) {
      const transformedText = transformFn(selectedText);
      const newText = text.substring(0, start) + transformedText + text.substring(end);
      setText(newText);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + transformedText.length);
      }, 0);
    } else {
        toast({
            title: "No text selected",
            description: "Please select the text you want to style.",
            variant: "destructive",
        });
    }
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    const newText = text.substring(0, start) + emoji + text.substring(end);
    setText(newText);
    
    setTimeout(() => {
        textarea.focus();
        const newCursorPosition = start + emoji.length;
        textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(
      () => {
        setIsCopied(true);
        toast({
          title: "Copied to clipboard!",
          description: "Your styled post is ready to be pasted on LinkedIn.",
        });
        setTimeout(() => setIsCopied(false), 3000);
      },
      (err) => {
        toast({
            title: "Failed to copy",
            description: "Could not copy text to clipboard.",
            variant: "destructive",
        })
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor</CardTitle>
              <CardDescription>
                Write your post and apply styles to selected text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex items-center gap-2 border rounded-t-md p-2 bg-card">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => applyTransform(toBold)} aria-label="Bold">
                        <Bold className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bold</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => applyTransform(toItalic)} aria-label="Italic">
                        <Italic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Italic</p>
                    </TooltipContent>
                  </Tooltip>
                   <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => applyTransform(toBoldItalic)} aria-label="Bold Italic">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M13.25 4L8.75 20" />
                          <path d="M6.25 4h6.5a3.5 3.5 0 0 1 0 7h-6.5a3.5 3.5 0 0 1 0 7h6.5" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bold & Italic</p>
                    </TooltipContent>
                  </Tooltip>
                  <Popover>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="icon" aria-label="Insert Emoji">
                            <Smile className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Insert Emoji</p>
                      </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="w-auto">
                      <div className="grid grid-cols-6 gap-1 p-2">
                        {popularEmojis.map((emoji) => (
                          <Button
                            key={emoji}
                            variant="ghost"
                            size="icon"
                            onClick={() => insertEmoji(emoji)}
                            className="text-lg rounded-full"
                          >
                            {emoji}
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </TooltipProvider>
              <Textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your LinkedIn post here..."
                className="w-full h-96 rounded-t-none text-base"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>
                This is how your post will look on LinkedIn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-card p-4 text-card-foreground">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://placehold.co/128x128.png" alt="User Avatar" data-ai-hint="man avatar"/>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="font-bold">John Doe • 1st</p>
                            <p className="text-xs text-muted-foreground truncate">VP of Engineering at Acme Corp | Building the future</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">1h • <Globe className="h-3 w-3" /></p>
                        </div>
                        <div className="flex text-muted-foreground shrink-0">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-4 whitespace-pre-wrap text-sm">
                  {text}
                </div>

                {/* Reactions */}
                <div className="mt-4 flex items-center gap-2">
                    <span className="text-base">👍</span>
                    <span className="text-base">💡</span>
                    <p className="text-xs text-muted-foreground">John Smith and 3 others</p>
                </div>

                <Separator className="my-2" />

                {/* Action Buttons */}
                <div className="flex justify-around items-center -mx-2">
                  <Button variant="ghost" className="text-muted-foreground font-semibold flex-1 flex items-center gap-2 hover:bg-muted">
                    <ThumbsUp className="h-5 w-5" />
                    Like
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground font-semibold flex-1 flex items-center gap-2 hover:bg-muted">
                    <MessageSquare className="h-5 w-5" />
                    Comment
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground font-semibold flex-1 flex items-center gap-2 hover:bg-muted">
                    <Repeat className="h-5 w-5" />
                    Repost
                  </Button>
                  <Button variant="ghost" className="text-muted-foreground font-semibold flex-1 flex items-center gap-2 hover:bg-muted">
                    <Send className="h-5 w-5" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCopy} className="w-full" size="lg" variant="default">
                {isCopied ? (
                  <Check className="mr-2 h-5 w-5" />
                ) : (
                  <Copy className="mr-2 h-5 w-5" />
                )}
                {isCopied ? "Copied!" : "Copy to Clipboard"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
