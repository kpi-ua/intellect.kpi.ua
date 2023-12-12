import React from 'react';
import Image from 'next/image';

type Props = {
    logoSrc: string;
};

const Footer: React.FC<Props> = ({ logoSrc }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white text-sm">
            <div className="wrapper flex sm:flex-row sm:text-left text-center flex-col justify-between py-9 gap-9">
                <Image className="max-w-120 mx-auto" src={logoSrc} alt="logo" />
                <section>
                    <p>
                        Національний технічний університет України &quot;Київський
                        політехнічний інститут імені Ігоря Сікорського&quot; &copy;
                        1998-{currentYear}
                    </p>
                    <p className="mt-2">
                        Адреса: <a href="https://kpi.ua/location">Україна, 03056 м.Київ-56, проспект Берестейський,&nbsp;37</a>
                    </p>
                </section>
                <section>
                    <p>
                        <a href="https://kbis.kpi.ua">Розробник – Конструкторське бюро інформаційних систем</a>
                    </p>
                    <p className="mt-2">
                        Створено в рамках проєкту &quot; <a href="https://ecampus.kpi.ua/home">Електронний кампус КПІ</a>&quot;
                    </p>
                </section>
                <section>
                    <p>
                        Використання матеріалу сайту тільки з обов’язковим
                        посиланням на <a href="https://intellect.kpi.ua">intellect.kpi.ua</a>
                    </p>
                </section>
            </div>
        </footer>
    );
};

export default Footer;
