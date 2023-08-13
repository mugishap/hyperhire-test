import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { Book } from '../@types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { axios } from '../utils/axios.interceptor';
import { useScreenSize } from '../hooks/useScreenSize';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { width: screenWidth } = useScreenSize();

  const limit: number = Math.floor(screenWidth / 187) * 3;

  const fetchBooks = async (abortController?: AbortController) => {
    try {
      const { data } = await axios.get(`/book/all?page=${currentPage}&limit=${limit}`, {
        signal: abortController?.signal,
      });
      if (!data.success) throw new Error(data.message);
      if (data.data.totalCount === 0) setHasMore(false);
      setBooks(books.concat(data.data.books));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMoreBooks = () => setCurrentPage(currentPage + 1);

  const refresh = () => {
    setBooks([]);
    setCurrentPage(0);
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchBooks(abortController);

    return () => {
      abortController.abort();
    };
  }, [currentPage]);
  return (
    <div className="h-screen w-full">
      <h1 className="text-black font-bold text-2xl text-center p-2">Books</h1>
      {/* <section className=""> */}
      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreBooks}
        hasMore={hasMore}
        scrollThreshold={0.8}
        loader={<h4 className="text-bold text-slate-500 text-center w-full">Loading...</h4>}
        pullDownToRefresh
        refreshFunction={refresh}
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 className="text-bold text-slate-500 text-center w-full">&#8595;</h3>}
        releaseToRefreshContent={<h3 className="text-bold text-slate-500 text-center w-full">&#8593;</h3>}
        // endMessage={<h4 className="text-bold text-slate-500 text-center w-full"></h4>}
        className="books flex gap-1 flex-wrap justify-items-stretch lg:px-2 pb-10">
        {books.map((book, index) => {
          return <BookCard key={index} {...book} discountRate={index + 1} />;
        })}
      </InfiniteScroll>
      {/* </section> */}
    </div>
  );
};

export default Home;
