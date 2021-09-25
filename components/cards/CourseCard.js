import { Card, Typography, Chip, Box } from "@material-ui/core"
import Link from "next/link"
import Image from "next/image"
import { currencyFormatter } from "../../utils/currency"

const CourseCard = ({ course }) => {
  const { title, instructor, price, image, slug, paid, category } = course
  return (
    <Link href={`course/${slug}`}>
      <Card style={{ padding: "1rem" }}>
        <Image
          src={image ? image.Location : "/course.jpg"}
          height={200}
          width={400}
        />
        <Box style={{ marginBottom: "0.25rem" }}>
          <Typography variant="h5">{title} </Typography>
          <Typography variant="body1">{instructor.name}</Typography>
        </Box>
        <Chip
          label={category}
          color="primary"
          style={{ display: "flex", marginBottom: "0.5rem" }}
        />
        <Chip
          label={
            paid
              ? currencyFormatter({ amount: price, currency: "gbp" })
              : "Free"
          }
          color="primary"
          style={{ display: "flex" }}
        />
      </Card>
    </Link>
  )
}

export default CourseCard
