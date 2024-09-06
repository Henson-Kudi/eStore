"use client"
export default () => {

  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: 'javascript:void()',
          name: 'Partners'
        },
        {
          href: 'javascript:void()',
          name: 'Blog'
        },
        {
          href: 'javascript:void()',
          name: 'Team'
        },
        {
          href: 'javascript:void()',
          name: 'Careers'
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: 'javascript:void()',
          name: 'contact'
        },
        {
          href: 'javascript:void()',
          name: 'Support'
        },
        {
          href: 'javascript:void()',
          name: 'Docs'
        },
        {
          href: 'javascript:void()',
          name: 'Pricing'
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: 'javascript:void()',
          name: 'Terms'
        },
        {
          href: 'javascript:void()',
          name: 'License'
        },
        {
          href: 'javascript:void()',
          name: 'Privacy'
        },
        {
          href: 'javascript:void()',
          name: 'About US'
        },
      ]
    }
  ]

  return (
    <footer className=" bg-black px-4 py-5 max-w-full md:px-8">
      <div className="gap-6 justify-between sm:flex sm:items-start">
        <div className="flex-col">
          <div className="max-w-xs flex flex-col gap-4">
            <p className="text-white mt-2 font-bold">NEWSLETTER</p>
            <p className="text-gray-300 pb-2">Sign up and get exclusive discount</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="border-1 gap-4 flex flex-col">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full p-4 outline-none bg-gray-200"
              />
              <button className="p-2.5 text-white text-xs md:text-1xl bg-gray-800 outline-none shadow-md focus:shadow-none sm:px-5 w-[50%]">
                SUBSCRIBE
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-between sm:flex md:space-y-0 md:mt-0 pt-4 md:pt-0">
          <p className="text-white mt-2 font-bold md:pb-2">Footers Menu</p>
          <div className="flex flex-col text-gray-300 gap-2">
            <p className=" hover:text-gray-600 cursor-pointer">Contact Us</p>
            <p className=" hover:text-gray-600 cursor-pointer">Search</p>
          </div>
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0 text-gray-600">
          &copy; 2022 - PRESTIGE ATTIRE.
        </div>
      </div>
      <style jsx>{`
              .svg-icon path,
              .svg-icon polygon,
              .svg-icon rect {
                  fill: currentColor;
              }
          `}</style>
    </footer>
  )
}
