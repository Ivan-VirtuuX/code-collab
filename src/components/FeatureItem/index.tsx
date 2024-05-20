import styles from "./FeatureItem.module.scss";

interface PlatformFeatureProps {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}
export const FeatureItem: React.FC<PlatformFeatureProps> = ({
  id,
  title,
  description,
  icon,
  color,
}) => {
  return (
    <div className={`${styles.container} flex gap-5`}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={`${styles.textContainer} flex flex-col gap-5 mt-2`}>
        <h3 className={styles.title} style={{ color }}>
          {title}
        </h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
