import React from 'react';
import {
    QuoteIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    UnderlineIcon,
    BoldIcon,
    ListIcon,
    Code2Icon,
} from "lucide-react";
import { Editor } from '@tiptap/react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type Props = {
    editor: Editor | null;
}

const Toolbar = ({ editor }: Props) => {
    if (!editor) return null;
    return (
        <div className="px-4 py-3 rounded-tl-md rounded-tr-md items-center gap-5 w-full border">
            <ToggleGroup type="multiple">
                <div className="flex flex-row justify-between items-center w-full">
                    <ToggleGroupItem
                        value="bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                        aria-label="Toggle bold"
                    >
                        <BoldIcon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="underline"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'is-active' : ''}
                        aria-label="Toggle underline"
                    >
                        <UnderlineIcon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h1"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                        aria-label="Toggle h1"
                    >
                        <Heading1Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h2"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                        aria-label="Toggle h2"
                    >
                        <Heading2Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h3"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                        aria-label="Toggle h3"
                    >
                        <Heading3Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h4"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                        aria-label="Toggle h4"
                    >
                        <Heading4Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h5"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                        aria-label="Toggle h5"
                    >
                        <Heading5Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="h6"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                        aria-label="Toggle h6"
                    >
                        <Heading6Icon />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="blockquote"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'is-active' : ''}
                        aria-label="Toggle blockquote"
                    >
                        <QuoteIcon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="bulletList"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                        aria-label="Toggle bulletList"
                    >
                        <ListIcon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="code"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                        aria-label="Toggle code"
                    >
                        <Code2Icon />
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="color"
                        aria-label="Toggle color"
                    >
                        <input
                            type="color"
                            onInput={event => editor.chain().focus().setColor(event.currentTarget.value).run()}
                            value={editor.getAttributes('textStyle').color}
                            data-testid="setColor"
                        />
                    </ToggleGroupItem>
                </div>
            </ToggleGroup>
        </div>
    )
}

export default Toolbar;