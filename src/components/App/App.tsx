import css from "./App.module.css";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import { fetchNotes } from "../../services/noteService.ts";
import type { GetNote } from "../../services/noteService.ts";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  /* const [currentPage, setcurrentPage] = useState(""); */
  const [searchValueDebonce] = useDebounce(searchValue, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const { data, isLoading } = useQuery<GetNote>({
    queryKey: ["notes", searchValueDebonce, currentPage],
    queryFn: () => fetchNotes(searchValueDebonce, currentPage, perPage),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {}
          <SearchBox value={searchValue} onChange={handleChange} />
          {/* {<Pagination/>} */}
          {
            <button className={css.button} onClick={openModal}>
              Create note +
            </button>
          }
        </header>
        {data && totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage - 1}
            onPageChange={(selectedPage) => setCurrentPage(selectedPage + 1)}
          />
        )}
        {!isLoading && data && <NoteList notes={data.notes} />}
        {isModalOpen && <NoteModal onClose={closeModal} />}
      </div>
    </>
  );
}
