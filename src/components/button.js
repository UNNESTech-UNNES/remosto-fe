'use client';

export function Button({
  onClick= () => {},
  text = '',
  variant = 'light',
  icon = null,
  iconPosition = 'right',
  iconOnly = false,
  fullWidth = false,
  ...props
}) {
  const styles = twStyles();

  let buttonClassName = '';
  switch (variant) {
    case 'dark':
      buttonClassName = [styles.base, styles.variant.dark].join(' ');
      break;
    case 'light':
      buttonClassName = [styles.base, styles.variant.light].join(' ');
      break;
    case 'brown':
      buttonClassName = [styles.base, styles.variant.brown].join(' ');
      break;
  }

  if (fullWidth) {
    buttonClassName = [buttonClassName, styles.fullWidth].join(' ');
  }

  return (
    <button onClick={onClick} className={buttonClassName} {...props}>
      {iconOnly ? (
        <div className="min-h-[28px] min-w-[28px] flex justify-center items-center">{icon}</div>
      ) : (
        <div className="flex justify-center items-center gap-2">
          {iconPosition === 'left' && icon}
          <span className="text-xl font-bold text-inherit">{text}</span>
          {iconPosition === 'right' && icon}
        </div>
      )}
    </button>
  );
}

const twStyles = () => ({
  base: [
    'px-8 py-4 grid place-items-center rounded-full relative h-fit bottom-2',
    'active:bottom-0',
  ].join(' '),
  variant: {
    dark: [
      'text-white border-4 border-forest-b bg-gradient-to-t from-[#53683B] to-[#907A48] shadow-[0_8px_0_0_#3A4928] ',
      'active:shadow-none',
      '[&>*]:drop-shadow-[0_4px_8px_rgb(0_0_0_/_50%)]',
    ].join(' '),
    light: [
      'text-forest-c border-4 border-forest-b bg-forest-f shadow-[0_8px_0_0_#3A4928]',
      'active:shadow-none',
    ].join(' '),
    brown: [
      'text-white border-4 border-forest-b bg-[#A87F22] shadow-[0_8px_0_0_#3A4928]',
      'active:shadow-none',
      '[&>*]:drop-shadow-[0_4px_8px_rgb(0_0_0_/_50%)]',
    ].join(' '),
  },
  fullWidth: 'w-full',
});
