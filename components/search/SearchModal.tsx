"use client";

import { InstantSearch, SearchBox, Hits } from "react-instantsearch";
import Link from "next/link";
import { searchClient } from "@/lib/algolia/searchClient";

function Hit({ hit }: any) {
  return (
    <Link
      href={hit.url}
      className="block rounded-md px-4 py-3 hover:bg-white/5 transition"
    >
      <p className="text-xs text-violet-400 uppercase tracking-wide">
        {hit.type}
      </p>
      <p className="text-white font-medium">{hit.title}</p>
      <p className="text-sm text-gray-400 line-clamp-2">
        {hit.description}
      </p>
    </Link>
  );
}

export default function SearchModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24">
      <div className="w-full max-w-2xl bg-[#030014] border border-white/10 rounded-xl shadow-2xl relative">
        <InstantSearch searchClient={searchClient} indexName="content">
          <SearchBox
            autoFocus
            placeholder="Search Codophile…"
            classNames={{
              form: "border-b border-white/10",
              input:
                "w-full bg-transparent px-4 py-4 text-white outline-none",
            }}
          />

          <div className="max-h-[60vh] overflow-y-auto p-2">
            <Hits hitComponent={Hit} />
          </div>
        </InstantSearch>
      </div>

      {/* click outside to close */}
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
      />
    </div>
  );
}