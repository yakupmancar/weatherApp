import { OptionType } from "../types/Types";

type Props = {
  term: string;
  options: [];
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: OptionType) => void;
  onSubmit: () => void;
};

const Search = ({
  term,
  options,
  inputChange,
  onOptionSelect,
  onSubmit,
}: Props) => {

  return (
    <div className="shadow-2xl text-xl backdrop-blur-[4px] bg-opacity-20 drop-shadow-lg rounded-lg flex items-center text-center justify-center md:max-w-[500px] p-4 md:px-10 lg:p-24 lg:h-[500px] h-[450px] flex-col gap-y-4">
      <h1 className="text-3xl font-extralight text-gray-200">
        Weather <strong className="text-gray-800 font-bold ">Forecast</strong>
      </h1>
      <p className="text-sm text-gray-700 font-bold">
        Enter below a place you want to know the weather of
      </p>

      <div className="relative bg-gray-100 rounded-[5px] py-2 flex text-gray-800 text-sm mx-5">
        <input
          onChange={inputChange}
          value={term}
          type="text"
          className="w-full text-black bg-gray-100 pl-2 outline-none"
        />
        <ul className="absolute top-9 flex flex-col text-sm ml-1 bg-gray-100 rounded-b-md">
          {options.map((option: OptionType, index: number) => (
            <li key={option.name + "-" + index}>
              <button
                onClick={() => onOptionSelect(option)}
                className="w-full text-left px-2 py-1 hover:bg-zinc-700 hover:text-gray-100"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="submit"
          onClick={onSubmit}
          className="bg-gray-800 px-2 py-1 ml-3 mr-1 my-[-4px] rounded-[4px] text-gray-200"
        >
          search
        </button>
      </div>
    </div>
  );
};

export default Search;
