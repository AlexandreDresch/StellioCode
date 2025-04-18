import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Tag } from "@/types";

type TagsSelectorProps = {
  tags: Tag[];
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
};

export function TagsSelector({
  tags,
  selectedTags,
  onChange,
}: TagsSelectorProps) {
  const selectedContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    onChange([...selectedTags, tag]);
  };

  useEffect(() => {
    if (selectedContainerRef.current) {
      selectedContainerRef.current.scrollTo({
        left: selectedContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedTags]);

  return (
    <div className="flex w-full flex-col">
      <motion.div
        className="no-scrollbar mb-3 flex h-14 w-full items-center justify-start gap-1.5 overflow-x-auto rounded-sm border bg-white p-1.5"
        ref={selectedContainerRef}
        layout
      >
        {selectedTags.length === 0 && (
          <span className="px-2 text-sm text-gray-400">
            Selecione tecnologias abaixo
          </span>
        )}

        {selectedTags.map((tag) => (
          <motion.div
            key={tag.id}
            className="flex h-full shrink-0 items-center gap-1 rounded-sm border bg-white py-1 pl-3 pr-1 text-sm shadow-sm"
            layoutId={`tag-${tag.id}`}
          >
            <motion.span layoutId={`tag-${tag.id}-label`}>
              {tag.label}
            </motion.span>
            <button
              type="button"
              onClick={() => removeSelectedTag(tag.id)}
              className="rounded-full p-1"
            >
              <X className="size-3 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </motion.div>
      {tags.length > selectedTags.length && (
        <motion.div
          className="w-full rounded-sm border bg-white p-2 shadow-sm"
          layout
        >
          <motion.div className="no-scrollbar flex max-h-36 flex-wrap gap-2 overflow-y-auto">
            {tags
              .filter(
                (tag) =>
                  !selectedTags.some((selected) => selected.id === tag.id),
              )
              .map((tag) => (
                <motion.button
                  type="button"
                  key={tag.id}
                  layoutId={`tag-${tag.id}`}
                  className="flex shrink-0 items-center gap-1 rounded-sm bg-gray-100/60 px-4 py-2.5"
                  onClick={() => addSelectedTag(tag)}
                >
                  <motion.span
                    layoutId={`tag-${tag.id}-label`}
                    className="text-sm font-normal"
                  >
                    {tag.label}
                  </motion.span>
                </motion.button>
              ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
