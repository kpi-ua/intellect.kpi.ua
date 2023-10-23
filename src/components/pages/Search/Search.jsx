import RoutePointer from '../../RoutePointer/RoutePointer';
import Alphabet from '../../Alphabet/Alphabet';
import InputField from '../../InputField/InputField';
import SearchGrid from '../../common/SearchGrid';
import ITeacherCard from '../../I-TeacherCard/I-TeacherCard';

import avatar1 from '../../../assets/testdata/avatar1.png';
import avatar2 from '../../../assets/testdata/avatar2.png';
import avatar3 from '../../../assets/testdata/avatar3.png';
import { useLocation } from 'react-router-dom';

const route = [{path: '/', label: 'Головна'}, {path: '/search?mode=alphabet', label: 'Алфавітний покажчик'}]

const testData = [
  {id: 0, avatar: null, name: 'Діброва Валентина Анатоліївна', qualification: 'Доцент', workplace: 'Кафедра англійської мови гуманітарного спрямування №3'},
  {id: 1, avatar: avatar1, name: 'Діденко Юрій Вікторович', qualification: 'Доцент', workplace: 'Кафедра мiкроелектронiки ФЕЛ'},
  {id: 2, avatar: avatar2, name: 'Дідковська Марина Віталіївна', qualification: 'Доцент', workplace: 'Кафедра математичних методів системного аналізу ІПСА'},
  {id: 3, avatar: avatar3, name: 'Дідковський Віталій Семенович', qualification: 'Професор', workplace: 'Кафедра акустики та акустоелектронiки ФЕЛ'},
  {id: 4, avatar: null, name: 'Дімітрієв Олег Петрович', qualification: 'Доцент', workplace: 'Кафедра прикладної фізики'},
  {id: 5, avatar: null, name: 'Дімарова Олена Володимирівна', qualification: 'Доцент', workplace: 'Кафедра загальної та теоретичної фiзики ФМФ'}
]

const Search = ({navigation}) => {
  const location = useLocation();
  console.log(location?.state?.letter)

  return (
    <section className='wrapper pt-12 pb-160'>
      <RoutePointer routePath={route} />
      <div className='mt-4'>
        <Alphabet />
        <div className='flex w-full rounded-lg border-1 border-neutral-100 p-1 mt-6'>
          <InputField
            placeholder='startwith:Д'
            fieldClass='flex-1'
            buttonText='Пошук'
            buttonClass='px-4 py-1'
          />
        </div>
      </div>
      <SearchGrid className='mt-6'>
        {
          testData.map(item => <ITeacherCard key={item.name} teacherInfo={item} />)
        }
      </SearchGrid>
    </section>
  )
}

export default Search;