import { useEffect, useState } from 'react';
import { type BlogPost, generateGradient, getMatchingPosts } from '../lib/blog-posts.ts';
import { setGlobalSearchParams } from '../lib/utils.ts';
import './index.css';
function getQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get('query') ?? '';
}

export function Posts() {
  const [query, setQuery] = useState(getQueryParam);

  useEffect(() => {
    const updateQuery = () => setQuery(getQueryParam());
    window.addEventListener('popstate', updateQuery);
    return () => {
      window.removeEventListener('popstate', updateQuery);
    };
  }, []);

  return (
    <div className="app">
      <Form query={query} setQuery={setQuery} />
      <MatchingPosts query={query} />
    </div>
  );
}

function Form({ query, setQuery }: { query: string; setQuery: (query: string) => void }) {
  const words = query.split(' ').map((w) => w.trim());

  const dogChecked = words.includes('dog');
  const catChecked = words.includes('cat');
  const caterpillarChecked = words.includes('caterpillar');

  function handleCheck(tag: string, checked: boolean) {
    const newWords = checked ? [...words, tag] : words.filter((w) => w !== tag);
    setQuery(newWords.filter(Boolean).join(' ').trim());
  }

  return (
    <form action={() => setGlobalSearchParams({ query })}>
      <div>
        <label htmlFor="searchInput">Search:</label>
        <input
          id="searchInput"
          name="query"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={dogChecked} onChange={(e) => handleCheck('dog', e.currentTarget.checked)} />{' '}
          🐶 dog
        </label>
        <label>
          <input type="checkbox" checked={catChecked} onChange={(e) => handleCheck('cat', e.currentTarget.checked)} />{' '}
          🐱 cat
        </label>
        <label>
          <input
            type="checkbox"
            checked={caterpillarChecked}
            onChange={(e) => handleCheck('caterpillar', e.currentTarget.checked)}
          />{' '}
          🐛 caterpillar
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

function MatchingPosts({ query }: { query: string }) {
  const matchingPosts = getMatchingPosts(query);

  return (
    <ul className="post-list">
      {matchingPosts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ul>
  );
}

function Card({ post }: { post: BlogPost }) {
  const [isFavorite, setIsFavorites] = useState(false);

  return (
    <li>
      {isFavorite ? (
        <button
          aria-label="Remove favorite"
          // 🐨 call onFavoriteClick
          onClick={() => setIsFavorites(false)}
        >
          ❤️
        </button>
      ) : (
        <button aria-label="Add favorite" onClick={() => setIsFavorites(true)}>
          🤍
        </button>
      )}
      <div className="post-image" style={{ background: generateGradient(post.id) }} />
      <a
        href={post.id}
        onClick={(event) => {
          event.preventDefault();
          alert(`Great! Let's go to ${post.id}!`);
        }}
      >
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </a>
    </li>
  );
}
