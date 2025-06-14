import css from "./App.module.css";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import NoteList from "../NoteList/NoteList.tsx";
import NoteModal from "../NoteModal/NoteModal.tsx";
import NoteForm from "../NoteForm/NoteForm.tsx";
import { fetchNotes } from "../../services/noteService.ts";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  /* const [currentPage, setcurrentPage] = useState(""); */
  const [searchValueDebonce] = useDebounce(searchValue, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 12;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(0);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchValueDebonce, currentPage],
    queryFn: () => fetchNotes(searchValueDebonce, currentPage + 1, perPage),
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
            currentPage={currentPage}
            onPageChange={(selectedPage) => setCurrentPage(selectedPage)}
          />
        )}
        {!isLoading && data && <NoteList notes={data.notes} />}
        {isModalOpen && (
          <NoteModal onClose={closeModal}>
            <NoteForm onCancel={closeModal} onSuccess={closeModal} />
          </NoteModal>
        )}
      </div>
    </>
  );
}
