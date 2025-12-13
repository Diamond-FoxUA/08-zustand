import Link from 'next/link';
import { NOTE_TAGS } from '@/lib/noteTags';
import css from './SidebarNotes.module.css';

const SidebarNotes = async () => {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </Link>
      </li>
      {NOTE_TAGS.map(tag => (
        <li className={css.menuItem} key={tag}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
