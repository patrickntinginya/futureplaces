-- Seed reference categories and realistic Tanzania demo businesses.
-- All demo businesses are marked is_mock = true and status = 'verified' so the
-- MVP has content to demo, but they are clearly flagged as non-production data.

INSERT INTO categories (slug, name, name_sw, icon) VALUES
  ('restaurants', 'Restaurants', 'Migahawa', 'utensils'),
  ('shops', 'Shops', 'Maduka', 'shopping-bag'),
  ('hotels', 'Hotels', 'Hoteli', 'bed'),
  ('health', 'Health', 'Afya', 'cross'),
  ('agriculture', 'Agriculture', 'Kilimo', 'sprout'),
  ('education', 'Education', 'Elimu', 'graduation-cap'),
  ('services', 'Services', 'Huduma', 'wrench'),
  ('fuel', 'Fuel', 'Mafuta', 'fuel'),
  ('entertainment', 'Entertainment', 'Burudani', 'music');

INSERT INTO businesses
  (owner_id, name, slug, category_id, description, phone, whatsapp, email, address, region, district, ward, latitude, longitude, cover_image, status, rating, review_count, is_mock)
VALUES
  (NULL, 'Tinde Highway Restaurant', 'tinde-highway-restaurant',
    (SELECT id FROM categories WHERE slug = 'restaurants'),
    'Mikahawa maarufu kwa chakula cha asili na nyama choma karibu na barabara kuu ya Dar-Morogoro.',
    '+255754000111', '+255754000111', 'info@tindehighway.co.tz',
    'Barabara ya Morogoro, Kibaha', 'Pwani', 'Kibaha', 'Msata', -6.8123, 38.9012,
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    'verified', 4.5, 128, true),

  (NULL, 'Mwanza Lakeview Hotel', 'mwanza-lakeview-hotel',
    (SELECT id FROM categories WHERE slug = 'hotels'),
    'Hoteli ya kifahari yenye mandhari ya Ziwa Victoria, vyumba safi na huduma nzuri kwa wageni.',
    '+255756220333', '+255756220333', 'reservations@mwanzalakeview.co.tz',
    'Capri Point, Mwanza', 'Mwanza', 'Nyamagana', 'Capri Point', -2.5164, 32.9000,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'verified', 4.7, 89, true),

  (NULL, 'Shinyanga Agro Supplies', 'shinyanga-agro-supplies',
    (SELECT id FROM categories WHERE slug = 'agriculture'),
    'Muuzaji wa mbegu bora, mbolea na dawa za kilimo kwa wakulima wa pamba na mahindi.',
    '+255713445566', '+255713445566', 'sales@shinyangaagro.co.tz',
    'Mtaa wa Ndala, Shinyanga Mjini', 'Shinyanga', 'Shinyanga Mjini', 'Ndala', -3.6619, 33.4232,
    'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80',
    'verified', 4.3, 41, true),

  (NULL, 'Dodoma Pharmacy Plus', 'dodoma-pharmacy-plus',
    (SELECT id FROM categories WHERE slug = 'health'),
    'Duka la dawa lenye dawa za kisasa, huduma ya haraka na wafamasia wenye ujuzi.',
    '+255789112233', '+255789112233', 'care@dodomapharmacy.co.tz',
    'Mtaa wa Uhuru, Dodoma Mjini', 'Dodoma', 'Dodoma Mjini', 'Uhuru', -6.1731, 35.7419,
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    'verified', 4.6, 63, true),

  (NULL, 'Arusha Tech Phones', 'arusha-tech-phones',
    (SELECT id FROM categories WHERE slug = 'shops'),
    'Duka la simu, vipuri na huduma ya kutengeneza simu za mikononi za aina zote.',
    '+255767889900', '+255767889900', 'shop@arushatech.co.tz',
    'Sokoine Road, Arusha', 'Arusha', 'Arusha Mjini', 'Sokoine', -3.3869, 36.6822,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    'verified', 4.2, 76, true),

  (NULL, 'Kariakoo Auto Mechanics', 'kariakoo-auto-mechanics',
    (SELECT id FROM categories WHERE slug = 'services'),
    'Karakana ya magari yenye mafundi wataalamu wa magari ya aina zote, huduma ya haraka.',
    '+255715667788', '+255715667788', NULL,
    'Msimbazi Street, Kariakoo, Dar es Salaam', 'Dar es Salaam', 'Ilala', 'Kariakoo', -6.8180, 39.2730,
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    'verified', 4.1, 54, true),

  (NULL, 'Dar Fuel Station Kimara', 'dar-fuel-station-kimara',
    (SELECT id FROM categories WHERE slug = 'fuel'),
    'Kituo cha mafuta chenye huduma ya haraka, hewa ya bure na duka dogo la vitafunwa.',
    '+255744990011', NULL, NULL,
    'Kimara Baruti, Dar es Salaam', 'Dar es Salaam', 'Kinondoni', 'Kimara', -6.8010, 39.1590,
    'https://images.unsplash.com/photo-1545262810-77515befe149?w=800&q=80',
    'verified', 4.0, 22, true),

  (NULL, 'Future Minds College', 'future-minds-college',
    (SELECT id FROM categories WHERE slug = 'education'),
    'Chuo cha kati kinachotoa kozi za IT, biashara na uongozi kwa vijana wa Tanzania.',
    '+255762334455', '+255762334455', 'admissions@futureminds.ac.tz',
    'Njiro, Arusha', 'Arusha', 'Arusha Mjini', 'Njiro', -3.4030, 36.7280,
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    'pending', 0, 0, true),

  (NULL, 'Zanzibar Nights Lounge', 'zanzibar-nights-lounge',
    (SELECT id FROM categories WHERE slug = 'entertainment'),
    'Sehemu ya starehe yenye muziki wa live, vinywaji baridi na mandhari nzuri ya bahari.',
    '+255778001122', '+255778001122', NULL,
    'Forodhani, Mjini Magharibi', 'Zanzibar', 'Mjini', 'Forodhani', -6.1630, 39.1900,
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80',
    'verified', 4.4, 97, true),

  (NULL, 'Dodoma Fresh Grocers', 'dodoma-fresh-grocers',
    (SELECT id FROM categories WHERE slug = 'shops'),
    'Duka la mboga mboga na matunda mapya kutoka kwa wakulima wa karibu.',
    '+255755112200', '+255755112200', NULL,
    'Area C, Dodoma', 'Dodoma', 'Dodoma Mjini', 'Area C', -6.1650, 35.7480,
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    'verified', 4.3, 18, true);

-- Sample opening hours for the first business (Mon-Sat 7:00-22:00, closed Sunday)
INSERT INTO business_hours (business_id, day_of_week, opens_at, closes_at, is_closed)
SELECT id, d, '07:00', '22:00', (d = 0)
FROM businesses, generate_series(0, 6) AS d
WHERE slug = 'tinde-highway-restaurant';

INSERT INTO business_hours (business_id, day_of_week, opens_at, closes_at, is_closed)
SELECT id, d, '00:00', '23:59', false
FROM businesses, generate_series(0, 6) AS d
WHERE slug = 'mwanza-lakeview-hotel';

INSERT INTO business_services (business_id, name)
SELECT id, s FROM businesses, unnest(ARRAY['Nyama choma', 'Samaki wa kukaanga', 'Vinywaji baridi']) AS s
WHERE slug = 'tinde-highway-restaurant';

INSERT INTO business_services (business_id, name)
SELECT id, s FROM businesses, unnest(ARRAY['Vyumba vya kawaida', 'Vyumba vya VIP', 'Mikutano']) AS s
WHERE slug = 'mwanza-lakeview-hotel';

INSERT INTO business_services (business_id, name)
SELECT id, s FROM businesses, unnest(ARRAY['Mbegu za mahindi', 'Mbolea', 'Dawa za wadudu']) AS s
WHERE slug = 'shinyanga-agro-supplies';
