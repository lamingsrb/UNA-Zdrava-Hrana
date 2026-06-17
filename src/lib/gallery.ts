/**
 * GENERISANO — ne menjati ručno.
 * Izvor: scripts/process-store-media.mjs  (node scripts/process-store-media.mjs)
 *
 * Metapodaci medija prodavnice: putanje, dimenzije, alt tekstovi i blur
 * placeholderi. Čitaju ih Gallery, About i Visit sekcije te JSON-LD
 * (slike za GroceryStore schema).
 */

export interface StoreImage {
  src: string
  alt: string
  kind: 'exterior' | 'interior'
  feature: boolean
  width: number
  height: number
  blurDataURL: string
}

export const galleryImages: StoreImage[] = [
    {
      src: "/images/store/store-front.jpg",
      alt: "Izlog prodavnice UNA Zdrava Hrana kod mosta u Bresnici, Kragujevac",
      kind: "exterior",
      feature: true,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMEBQL/xAAnEAACAgEDAQgDAAAAAAAAAAABAgADEQQSIWEFFSMxNEJRcXKB4f/EABcBAAMBAAAAAAAAAAAAAAAAAAECAwD/xAAZEQEBAQADAAAAAAAAAAAAAAABAAIDEkH/2gAMAwEAAhEDEQA/ALwVGUMlisOhld+0a9PYyFGyvmTiQavX1lDTRp0XPPJmegC2Nvq3VsoG0Njn5lnl20uhb3edRqYbnT8xgE4/sTB01njPXcoO85Abp1+oiO9eRAu7PUt9CS1e6Igmo9QBszjkMMH9xEQNm//Z"
    },
    {
      src: "/images/store/store-interior-bulk.jpg",
      alt: "Police sa rinfuz suvim voćem, koštunjavim plodovima i superhranom u prodavnici UNA",
      kind: "interior",
      feature: true,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAQBAgX/xAAnEAABBAAEBAcAAAAAAAAAAAABAAIDERITISIEBTFRIzJBYXGBof/EABcBAQEBAQAAAAAAAAAAAAAAAAIAAQP/xAAYEQEBAQEBAAAAAAAAAAAAAAAAARECMf/aAAwDAQACEQMRAD8ApaYWRlxl3geQiiuGzFzh4btfUD9UM8bpZrgaXxgda0PwtikYx2/G03W03qfZGzG7rZYDxBtscgDASS26cUVHCx5AwZw3uvCRRvtSJcyq2LmAdK0Xlc1AABGhI6/aIgkjHHLidZsNBB7bgiIu/Pg1/9k="
    },
    {
      src: "/images/store/store-entrance.jpg",
      alt: "Ulaz u prodavnicu UNA sa suncobranima i rashladnim vitrinama, Bresnica",
      kind: "exterior",
      feature: false,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQFAQIG/8QAJBAAAgIBAwIHAAAAAAAAAAAAAQIAAxEEEiEFUTEyQmFxcvH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAwT/xAAdEQACAgEFAAAAAAAAAAAAAAAAAQIRMQQSIUGB/9oADAMBAAIRAxEAPwCXV1S4nca9id8eM11XVGsAUEmxuAMyuS3fUa3zkHKqBnd7SBtt1FjBcAIcnJxmO5AdWdJpRZXWK2ZS5JJMSrD2BaxYzIPKWHPIz2PxEyTWob4nXhRbO0R7OG4mdJw5xx+GIm1ZIywPQv3aIiESwj//2Q=="
    },
    {
      src: "/images/store/store-sign.jpg",
      alt: "Ulična tabla Slobodana Penezića Krcuna na uglu prodavnice UNA u Bresnici",
      kind: "exterior",
      feature: false,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIDBQT/xAAjEAACAgICAgEFAAAAAAAAAAABAgARAwQSIQUxI1FhgZHR/8QAFgEBAQEAAAAAAAAAAAAAAAAABAMA/8QAHBEAAgICAwAAAAAAAAAAAAAAAAECERMhAzEy/9oADAMBAAIRAxEAPwDnfw5DfDlprodVfr+yWluZ8ZddtueJLHICyJYpOPYfkxx4QtoQemkNQcsec0eJPv8AEybi9FJxTVs0vG7GLbxVhNlAAwr1EzfGZ0RSrscZ6o1XL9CJbLJaoLji92ZquxJBYkD0LnXhZhqMAxAL9i/tEQ8ex3N5K07UX9IiJYGf/9k="
    },
    {
      src: "/images/store/store-interior-wide.jpg",
      alt: "Unutrašnjost prodavnice UNA — police pune zdravih namirnica, čajeva i suplemenata",
      kind: "interior",
      feature: false,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMEBf/EACUQAAICAQMDBAMAAAAAAAAAAAECAAMRBCExEhMiI0FRYYGRof/EABYBAQEBAAAAAAAAAAAAAAAAAAIBAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABMRH/2gAMAwEAAhEDEQA/AL2PWlXVUxFhyxQtkY+BIrYlzDtgnP7mLX61rNV20t9MV+Ww53zJUXNWrPVYVZ2A53G0Ni9dGyypG6SyqRySYmUWVswF6sbM8r/YkZiUBtRYGGfEc/mara6woIRQen2ERFdGYvRtqtL9gZ+9jERIT//Z"
    },
    {
      src: "/images/store/store-street.jpg",
      alt: "Prodavnica UNA na uglu kod mosta u Bresnici, pogled iz ulice",
      kind: "exterior",
      feature: false,
      width: 1920,
      height: 1440,
      blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAUGAgME/8QAJhAAAQQBAwIHAQAAAAAAAAAAAQACAxEEBRITITEUIjJCUXKBsf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBAH/xAAbEQACAgMBAAAAAAAAAAAAAAAAAQIDFDFBUf/aAAwDAQACEQMRAD8A6ZIKFmgPklY47GzOIie2Su+03SlRhY8e/ZHt5BTg0kWFD6hxabfh9OLB25QSB+EKjJk3oS6l6MrUYMI7TbpK9NEUir+TLJNIxz3SO6+YuduAF9giB2yfTVBLhfveFozesI+zf6ERTscVPUWtbmzhrQ0B5oAIiJwB/9k="
    }
  ]

/** Glavni izlog — About sekcija + GroceryStore JSON-LD slika. */
export const storeFront = galleryImages.find((i) => i.src.endsWith('/store-front.jpg'))!

/** Poster za video šetnju kroz radnju. */
export const walkthroughPoster = {
  src: '/images/store/store-walkthrough-poster.jpg',
  alt: "Šetnja kroz prodavnicu UNA — pogled na police iznutra",
  width: 1920,
  height: 1440,
  blurDataURL: "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAASABgDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAMEBf/EACUQAAICAQMDBAMAAAAAAAAAAAECAAMRBCExEhMiI0FRYYGRof/EABYBAQEBAAAAAAAAAAAAAAAAAAIBAP/EABcRAQEBAQAAAAAAAAAAAAAAAAABMRH/2gAMAwEAAhEDEQA/AL2PWlXVUxFhyxQtkY+BIrYlzDtgnP7mLX61rNV20t9MV+Ww53zJUXNWrPVYVZ2A53G0Ni9dGyypG6SyqRySYmUWVswF6sbM8r/YkZiUBtRYGGfEc/mara6woIRQen2ERFdGYvRtqtL9gZ+9jERIT//Z",
}

/** Video šetnja kroz prodavnicu (720p H.264, bez zvuka, faststart). */
export const walkthroughVideo = '/images/store/store-walkthrough.mp4'
