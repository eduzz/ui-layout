export type UserMenuGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string;
  children: React.ReactNode;
};

const UserMenuGroup = ({ label, children, ...rest }: UserMenuGroupProps) => {
  return (
    <div className='uizz:flex uizz:flex-col' {...rest}>
      <p className='uizz:mb-0 uizz:mt-2 uizz:px-4 uizz:py-2 uizz:text-sm uizz:font-bold uizz:tracking-[0.3px]'>
        {label}
      </p>
      {children}
    </div>
  );
};

export default UserMenuGroup;
