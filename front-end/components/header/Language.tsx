import { useRouter } from "next/router";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="flex">
      <select
        role="language"
        id="language"
        className="m-1 p-1 text-white"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en" className="text-white">
          English
        </option>
        <option value="nl" className="text-white">
          Nederlands
        </option>
        <option value="es" className="text-white">
          Español
        </option>
        <option value="ro" className="text-white">
          Română
        </option>
      </select>
    </div>
  );
};

export default Language;
