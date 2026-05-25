'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { getAllDescendantIds } from '@/lib/filter-data';
import type { NestedItem } from '@/lib/filter-data';

interface NestedCheckboxProps {
  item: NestedItem;
  selectedIds: string[];
  onToggle: (id: string, checked: boolean) => void;
  level?: number;
  /** True when an ancestor's own ID is already in selectedIds — makes this node appear checked */
  parentSelected?: boolean;
}

export function NestedCheckbox({
  item,
  selectedIds,
  onToggle,
  level = 0,
  parentSelected = false,
}: NestedCheckboxProps) {
  const hasChildren = !!item.children?.length;

  const allDescendantIds = useMemo(
    () => (hasChildren ? getAllDescendantIds(item) : []),
    [item, hasChildren],
  );

  // Checked when:
  //  - an ancestor is directly selected (parentSelected), OR
  //  - this node's own ID is in selectedIds, OR
  //  - every direct child is individually selected
  const allChildrenSelected =
    hasChildren && item.children!.every((c) => selectedIds.includes(c.id));
  const isChecked = parentSelected || selectedIds.includes(item.id) || allChildrenSelected;

  // Indeterminate: some (not all) descendants are involved, and this node isn't fully checked
  const someDescendantsSelected = allDescendantIds.some((id) => selectedIds.includes(id));
  const isIndeterminate = !isChecked && someDescendantsSelected;

  // Auto-open when a direct child becomes selected; start closed otherwise
  const hasSelectedDirectChild =
    hasChildren && item.children!.some((c) => selectedIds.includes(c.id));
  const [isOpen, setIsOpen] = useState(() => hasSelectedDirectChild);
  useEffect(() => {
    if (hasSelectedDirectChild) setIsOpen(true);
  }, [hasSelectedDirectChild]);

  // Sync indeterminate imperatively — React doesn't track this property
  const checkboxRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  // Whether children should inherit the "checked" visual state
  // True if this node's own ID is selected, or an ancestor already propagated it down
  const propagateSelected = parentSelected || selectedIds.includes(item.id);

  return (
    <div style={{ marginLeft: level * 12 }}>
      <div className="flex items-center gap-1.5 py-0.5">
        {hasChildren ? (
          <button
            onClick={() => setIsOpen((o) => !o)}
            className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-gray-600 shrink-0"
            aria-label={isOpen ? 'Collapse' : 'Expand'}
          >
            <svg
              className={`w-2.5 h-2.5 transition-transform duration-100 ${isOpen ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 8 12"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 2l4 4-4 4" />
            </svg>
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        <input
          ref={checkboxRef}
          type="checkbox"
          checked={isChecked}
          onChange={() => onToggle(item.id, !isChecked)}
          className="w-4 h-4 rounded border-gray-300 accent-[#2088c9] cursor-pointer shrink-0"
        />

        <span
          className="text-sm text-gray-700 cursor-pointer select-none hover:text-gray-900 leading-tight"
          onClick={() => onToggle(item.id, !isChecked)}
        >
          {item.name}
        </span>
      </div>

      {hasChildren && isOpen && (
        <div>
          {item.children!.map((child) => (
            <NestedCheckbox
              key={child.id}
              item={child}
              selectedIds={selectedIds}
              onToggle={onToggle}
              level={level + 1}
              parentSelected={propagateSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
}
