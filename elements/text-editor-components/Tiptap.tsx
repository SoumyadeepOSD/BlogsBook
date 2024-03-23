"use client";

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import CharacterCount from '@tiptap/extension-character-count'
import { EditorContent, useEditor } from "@tiptap/react";
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import BulletList from '@tiptap/extension-bullet-list'
import Blockquote from '@tiptap/extension-blockquote'
import TextStyle from '@tiptap/extension-text-style'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import ListItem from '@tiptap/extension-list-item'
import html from 'highlight.js/lib/languages/xml'
import Document from '@tiptap/extension-document'
import css from 'highlight.js/lib/languages/css'
import { StarterKit } from "@tiptap/starter-kit";
import xml from 'highlight.js/lib/languages/xml'
import { Color } from '@tiptap/extension-color'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import React, { useState } from "react";
import {createLowlight} from "lowlight";
import Toolbar from "./Toolbar";
import "../../app/globals.css";

const lowlight = createLowlight()
lowlight.register({html})
lowlight.register({css})
lowlight.register({js})
lowlight.register({ts})
lowlight.register({xml})

const limit = 20000;
type TipTapTextAreaProps = {
    content: string;
    setContent: (content: string) => void;
    setWordCount: (content: number) => void;
};

export const TipTapTextArea = ({content, setContent, setWordCount}: TipTapTextAreaProps) => {
    // const [editorState, setEditorState] = useState("");
    const editor = useEditor({
        autofocus: true,
        extensions:
            [StarterKit,
                Blockquote.configure({HTMLAttributes: {class: 'blockquote',}}),
                Heading.configure({levels: [1, 2, 3, 4, 5, 6],}),
                Color.configure({types: ['textStyle'],}),
                CodeBlockLowlight.configure({lowlight,}),
                CharacterCount.configure({limit,}),
                Document, Paragraph, Text,
                Underline,
                TextStyle,
                ListItem,
                Bold,
                BulletList.configure({
                    HTMLAttributes: {class: 'listitem',},
                    itemTypeName: 'listItem',
                    keepMarks: true,
                    keepAttributes: true,
                }),
            ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
            setWordCount(editor.storage.characterCount.characters());
        },
    });
    return (
        <div>
            <div>
                {editor && <Toolbar editor={editor} />}
            </div>


            <div className="prose prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600">
                <EditorContent editor={editor} className="bg-white px-4"/>
            </div>
            <div>
                {editor?.storage.characterCount.characters()}/{limit} characters, [{editor?.storage.characterCount.words()} words]
            </div>
        </div>
    )
}



